var express = require('express')
var path = require('path');
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const admin = require('firebase-admin')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


const serviceAccount = require("./config/fbServiceAccountKey.json");

/// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  authDomain: "ecomplainbox-18f35.firebaseapp.com"
});


var app = express();

var userEmail=""

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Assign firestore to db variable 
var db= admin.firestore();

/* Check Token valid or not */
function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then((r) => {
        console.log(r);
        userEmail=r.email;
         console.log(userEmail);
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}

function generate(n) {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

  if ( n > max ) {
          return generate(max) + generate(n - max);
  }

  max        = Math.pow(10, n+add);
  var min    = max/10; // Math.pow(10, n) basically
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;

  return ("" + number).substring(add); 
}
app.use('/', checkAuth)

app.get('/', (req, res) => {
  db.collection('Users')
  .get()
  .then(querySnapshot => {
    const documents = querySnapshot.docs.map(doc => doc.data())
    res.json({message:documents});
  })
})

function sendMail(to,subject,text,html) {
  const msg = {
    to: to,
    from: 'ramanasankarv@gmail.com', // Use the email address or domain you verified above
    subject: subject,
    text: text,
    html: html,
  };

  sgMail
  .send(msg)
  .then(() => {
    console.log("mailsend")
  }, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
}

/*  
  Registration api 
  params email,fullname, password 
  Method : POST
 */

app.post('/registration', (req, res) => { 

  const otp = generate(6);
  const data = {
    Email: req.body.email,
    UserStatus: 'Active',
    UserRoleID: 'hqvWoXWRqePiznmneyj5',
    FullName: req.body.fullname,
    IsEmailVerified: 'No',
    IsMobileVerified: 'No',
    Password: req.body.password,
    CreatedAt: admin.firestore.FieldValue.serverTimestamp(),
    Mobile:req.body.mobile,
    EmailOtp: otp
  };
  
  const usersRef = db.collection('Users');
  const snapshot = usersRef.where('Email', '==', req.body.email).get().then(querySnapshot => {
  const documents = querySnapshot.docs.map(doc => doc.data())

    if(documents.length==0){
      db.collection('Users').add(data)
      .then(function(docRef) {
        
        const msg = {
          to: req.body.email,
          from: 'ramanasankarv@gmail.com', // Use the email address or domain you verified above
          subject: 'Please verify your email. Verification code '+otp,
          text: 'Hi, Please confirm your email address by entering the following code in e Complain Box. Verification code: '+otp+' Best, e Complain Box',
          html: 'Hi,<br>Please confirm your email address by entering the following code in e Complain Box. <br><br>Verification code: '+otp+'<br><br>Best,<br>e Complain Box',
        };

        sgMail
        .send(msg)
        .then(() => {
          console.log("mailsend")
        }, error => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body)
          }
        });

        data.UserRole="Complainant";

        data.id=docRef.id;
        data.Password="";
        data.EmailOtp="";

        res.json({
          message: data,
        })
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        res.json({
          message: "Error adding document: ", error
        })
        console.error("Error adding document: ", error);
      });  
    }else{
      res.json({message:"Email Id exist"});
    }
  }).catch(function(error) {
    res.json({
      message: "Error adding document: ", error
    })
    console.error("Error adding document: ", error);
  });  
})

app.post('/getemailbymobile',  (req, res) => { 

  const data = {
    Mobile:req.body.mobile
  };
  
  const usersRef = db.collection('Users');
  const snapshot = usersRef.where('Mobile', '==', parseInt(req.body.mobile)).limit(1).get().then(querySnapshot => {
    
    const documents = querySnapshot.docs.map(doc => doc.data())
    console.log(documents);
    if(documents.length==0){
       res.json({message:"Mobile not found in our DB"});
    }else{
      const user = documents;

      res.json({userEmail:user[0].Email});
    }
  }).catch(function(error) {
    res.json({
      message: "Error adding document: ", error
    })
    console.error("Error adding document: ", error);
  });  
})

app.post('/emailverification',  (req, res) => { 

  
  const usersRef = db.collection('Users');
  const snapshot = usersRef.where('Email', '==', req.body.email).limit(1).get().then(querySnapshot => {
    
    const documents = querySnapshot.docs.map(doc => doc.data())
    console.log(documents);
    if(documents.length==0){
       res.json({message:"Email not found in our DB"});
    }else{
      const user = documents;
      if(req.body.otp==user[0].EmailOtp){
        db.collection('Users').doc(req.body.docId).update({IsEmailVerified:"Yes"});
        //admin.firebase().ref('Users/' + req.body.docId + '/IsEmailVerified').set('Yes');
        res.json({message:"success"}); 
      }else{
        res.json({message: "invalid otp "}); 
      }
    }
  }).catch(function(error) {
    res.json({
      message: "Error adding document: ", error
    })
    console.error("Error adding document: ", error);
  });  
})

app.post('/mobileverification',  (req, res) => { 

  if(req.body.otp=="091011"){
    db.collection('Users').doc(req.body.docId).update({IsMobileVerified:"Yes"});
    res.json({message:"success"}); 
  }else{
    res.json({message: "invalid otp "}); 
  }

})

app.post('/userdata', async (req, res) => { 
  console.log("ramana");
  console.log(userEmail);
  let Role={};

  await db.collection('UserRoles').get().then((results) => {
    results.forEach((doc) => {
      Role[doc.id] = doc.data();
    });
  });
  //console.log(Role);

  const usersRef = db.collection('Users');
  const snapshot = usersRef.where('Email', '==', req.body.email).limit(1).get().then(querySnapshot => {
    
    const documents = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
    })
    //console.log(documents);
    if(documents.length==0){
       res.json({message:"Email not found in our DB"});
    }else{
      const user = documents;
      user[0].UserRole=Role[documents[0].UserRoleID].UserRoleType;
      user[0].Password = "";
      user[0].EmailOtp = "";
      res.json({user:user});
    }
  }).catch(function(error) {
    res.json({
      message: "Error adding document: ", error
    })
    console.error("Error adding document: ", error);
  });  
})

app.get('/', (req, res) => {
  db.collection('Departments')
  .get()
  .then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      res.json({Departments:tempDoc});
   }) 
})

app.post('/createcomplaint',(req, res) => {
  const ComplainDocument = {
    ComplainDocumentPath:  req.body.urls
  }
  const data = {
    ComplainCity: req.body.city,
    ComplainDepartmentID: req.body.department,
    ComplainDescription: req.body.description,
    ComplainSeverity: req.body.severity,
    ComplainType:req.body.complainType,
    //ComplainIPAddress: req.body.ipaddress,
    ComplainStatus: 'Raise',
    ComplainSubject: req.body.subject,
    ComplainUserID: req.body.userid,
    CreatedAt: admin.firestore.FieldValue.serverTimestamp(),
    ComplainDocument:ComplainDocument,
  } 

  db.collection('Complains').add(data)
    .then(function(docRef) { 
      res.json({message:docRef.id});
    })
    .catch(function(error) {
        res.json({
          message: "Error adding document: ", error
        })
        console.error("Error adding document: ", error);
    });

})

app.post('/createcomments/:id', async(req,res) => {
  var ComplaintId = req.params.id;
  
  let user = await db.collection('Users').doc(req.body.userid).get();
  let fromUser = user.data();
  let role="User";
  if(fromUser.UserRoleID=="uHugZaQMw3AfFkXT8jrq"){
    role="E-Complain Box";
  }else if(fromUser.UserRoleID=="ZmCXkZ7lvHq709vewPBk"){
    role="Department";
  }
  const data = {
    comments: req.body.comments,
    by: role,
    userid: req.body.userid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  } 
  console.log(req.body.id);  

  let complaint = await db.collection('Complains').doc(ComplaintId).get();
  let Complaint = complaint.data();

  db.collection('Complains/'+ComplaintId+'/comments').add(data)
  .then(function(docRef) { 
    if(fromUser.UserRoleID!="hqvWoXWRqePiznmneyj5"){
      db.collection('Users').doc(Complaint.ComplainUserID).get().then(function(userRef) {
        let touser = userRef.data();
        let subject='Reply: '+ Complaint.ComplainSubject+' from '+role;
        let text= 'Hi'+touser.FullName+','+req.body.comments+'Best, e Complain Box';
        let html= 'Hi '+touser.FullName+',<br>'+req.body.comments+'<br><br>Best,<br>e Complain Box';
        sendMail(touser.Email,subject,text,html);
      }) 
    }
      
    res.json({message:docRef.id});

    })
    .catch(function(error) {
        res.json({
          message: "Error adding document: ", error
        })
        console.error("Error adding document: ", error);
    });
})

app.put('/updatecomplaint/:id',(req,res) => {
  (async () => {
    try
    {
      const ComplainDocument = {
        ComplainDocumentPath:  req.body.urls
      }
      const document = db.collection('Complains').doc(req.params.id);
      await document.update({
        ComplainCity: req.body.city,
        ComplainDepartmentID: req.body.department,
        ComplainDescription: req.body.description,
        ComplainSeverity: req.body.severity,
        ComplainType:req.body.complainType,
        //ComplainIPAddress: req.body.ipaddress,
        //ComplainStatus: 'Raise',
        ComplainSubject: req.body.subject,
        ComplainUpdateTime: admin.firestore.FieldValue.serverTimestamp(),
        ComplainDocument:ComplainDocument,
      });
      if(req.body.complainstatus=="Completed"){

      }
      return res.status(200).send({message:"Success"});
    }
    catch (error)
    {
      console.log(error)
      return res.status(500).send(error);
    }
  })();

})

app.get('/getcomplaints/:page/:lt', async (req,res) => {
  var page = parseInt(req.params.page);
  var limit1 = parseInt(req.params.lt);
  if(isNaN(page)){
    page=1;
  }else if(page<1){
    page=1;
  }

  if(isNaN(limit1)){
    limit1=10;
  }else if(limit1<1){
    limit1=10;
  }else if(limit1>100){
    limit1=100;
  }
  var count = 0;

  var lastDoc = (page-1) * limit1;

  let CreatedAt ="";

  var ComplainsCollection = db.collection('Complains');

  const document = db.collection('Complains');

  await ComplainsCollection.orderBy('CreatedAt','desc').get().then(res =>{
       count = res.size
       if(page>1){
          lastCreated = res.docs[lastDoc - 1];
          CreatedAt = lastCreated.data().CreatedAt;
       }
  });

  let ComplaintQuery = document.limit(limit1).orderBy('CreatedAt','desc').startAfter(CreatedAt);
  
  ComplaintQuery.get()
  .then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      res.json({count:count,Complains:tempDoc,limit:limit1,page:page});
  })

})

app.get('/publiccomplaints/:page/:lt', async (req,res) => {
  var page = parseInt(req.params.page);
  var limit1 = parseInt(req.params.lt);
  if(isNaN(page)){
    page=1;
  }else if(page<1){
    page=1;
  }

  if(isNaN(limit1)){
    limit1=10;
  }else if(limit1<1){
    limit1=10;
  }else if(limit1>100){
    limit1=100;
  }
  var count = 0;

  var lastDoc = (page-1) * limit1;

  let CreatedAt ="";

  var ComplainsCollection = db.collection('Complains');

  const document = db.collection('Complains').where('ComplainType','in', ["Public",'public']);

  await ComplainsCollection.where('ComplainType','in', ["Public",'public']).orderBy('CreatedAt','desc').get().then(res =>{
       count = res.size
       if(page>1){
          lastCreated = res.docs[lastDoc - 1];
          CreatedAt = lastCreated.data().CreatedAt;
       }
  });

  let ComplaintQuery = document.limit(limit1).orderBy('CreatedAt','desc').startAfter(CreatedAt);
  
  ComplaintQuery.get()
  .then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      res.json({count:count,Complains:tempDoc,limit:limit1,page:page});
  })

})

app.get('/complaintsbyseverity/:severity/:page/:lt', async (req,res) => {
  var severity = req.params.severity;
  var page = parseInt(req.params.page);
  var limit1 = parseInt(req.params.lt);
  if(isNaN(page)){
    page=1;
  }else if(page<1){
    page=1;
  }

  if(isNaN(limit1)){
    limit1=10;
  }else if(limit1<1){
    limit1=10;
  }else if(limit1>100){
    limit1=100;
  }
  var count = 0;

  var lastDoc = (page-1) * limit1;

  let CreatedAt ="";

  var ComplainsCollection = db.collection('Complains');

  const document = db.collection('Complains').where('ComplainSeverity','==', severity);

  await ComplainsCollection.where('ComplainSeverity','==', severity).orderBy('CreatedAt','desc').get().then(res =>{
       count = res.size
       if(page>1){
          lastCreated = res.docs[lastDoc - 1];
          CreatedAt = lastCreated.data().CreatedAt;
       }
  });

  let ComplaintQuery = document.limit(limit1).orderBy('CreatedAt','desc').startAfter(CreatedAt);
  
  ComplaintQuery.get()
  .then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      res.json({count:count,Complains:tempDoc,limit:limit1,page:page});
  })

})

app.get('/complaint/:id', async (req,res) =>{
  console.log("ramana");
  console.log(userEmail);
  (async () => { 
    try
    {
      const document = db.collection('Complains').doc(req.params.id);
      let Complaint = await document.get();
      let response = Complaint.data();

      let department = await db.collection('Departments').doc(response.ComplainDepartmentID).get();
      response.department = department.data();

      let comments = await db.collection('Complains/'+req.params.id+'/comments').get().then((subCollectionSnapshot) => {
          const tempDoc = []
          subCollectionSnapshot.forEach((subDoc) => {
            tempDoc.push({ id: subDoc.id, ...subDoc.data() })
              console.log(subDoc.data());
          });
          response.comments = tempDoc;
      });

      let city = await db.collection('Cities').doc(response.ComplainCity).get();
      response.city = city.data();

      let user = await db.collection('Users').doc(response.ComplainUserID).get();
      response.user = user.data();

      var key = "EmailOtp";
      delete response.user[key];

      var key = "Password";
      delete response.user[key];

      return res.status(200).send(response);
    }
    catch (error)
    {
      console.log(error)
      return res.status(500).send(error);
    }
  })(); 
});

app.get('/complaintbydep/:id/:page/:lt',(req,res) =>{
  (async () => { 
    try
    {
      var page = parseInt(req.params.page);
      var limit1 = parseInt(req.params.lt);
      if(isNaN(page)){
        page=1;
      }else if(page<1){
        page=1;
      }

      if(isNaN(limit1)){
        limit1=10;
      }else if(limit1<1){
        limit1=10;
      }else if(limit1>100){
        limit1=100;
      }
      var count = 0;

      var lastDoc = (page-1) * limit1;

      let CreatedAt="";

      const document = db.collection('Complains').where("ComplainDepartmentID", "==", req.params.id);

      var ComplainsCollection = db.collection('Complains').where("ComplainDepartmentID", "==", req.params.id);
      await ComplainsCollection.orderBy('CreatedAt','desc').get().then(res =>{
        count = res.size
        if(page>1){
          lastCreated = res.docs[lastDoc - 1];
          CreatedAt = lastCreated.data().CreatedAt;
        }
      });

      let ComplaintQuery = document.limit(limit1).orderBy('CreatedAt','desc').startAfter(CreatedAt);
      
      ComplaintQuery.get()
      .then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
           tempDoc.push({ id: doc.id, ...doc.data() })
        })
        return res.status(200).send({count:count,Complains:tempDoc,limit:limit1,page:page});
      })
      // let response = Complaint.data();

      // return res.status(200).send(response);
    }
    catch (error)
    {
      console.log(error)
      return res.status(500).send(error);
    }
  })(); 
});

app.get('/complaintbyuser/:id/:page/:lt',(req,res) =>{
  (async () => { 
    try
    {
      var page = parseInt(req.params.page);
      var limit1 = parseInt(req.params.lt);
      if(isNaN(page)){
        page=1;
      }else if(page<1){
        page=1;
      }

      if(isNaN(limit1)){
        limit1=10;
      }else if(limit1<1){
        limit1=10;
      }else if(limit1>100){
        limit1=100;
      }
      var count = 0;

      var lastDoc = (page-1) * limit1;

      let CreatedAt="";

      const document = db.collection('Complains').where("ComplainUserID", "==", req.params.id);
      
      var ComplainsCollection = db.collection('Complains').where("ComplainUserID", "==", req.params.id);
      await ComplainsCollection.orderBy('CreatedAt','desc').get().then(res =>{
        count = res.size
        if(page>1){
          lastCreated = res.docs[lastDoc - 1];
          CreatedAt=lastCreated.data().CreatedAt;
        }
      });


      let ComplaintQuery = document.limit(limit1).orderBy('CreatedAt','desc').startAfter(CreatedAt);
      
      ComplaintQuery.get()
      .then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
           tempDoc.push({ id: doc.id, ...doc.data() })
        })
        //lastDoc = querySnapshot.get(querySnapshot.size() - 1).getId();
        //console.log(lastDoc.CreatedAt);
        return res.status(200).send({count:count,Complains:tempDoc,limit:limit1,page:page});
      })
      // let response = Complaint.data();

      // return res.status(200).send(response);
    }
    catch (error)
    {
      console.log(error)
      return res.status(500).send(error);
    }
  })(); 
});

app.put('/complaint/:id',(req,res) => {
  (async () => {
    try
    {
      const document = db.collection('Complains').doc(req.params.id);
      await document.update({
        ComplainStatus:req.body.complainstatus,
        ComplainDepartmentID: req.body.department,
        ComplainUpdateTime: admin.firestore.FieldValue.serverTimestamp(),
        ComplainDepartmentUserId : req.body.userid
      });
      return res.status(200).send();
    }
    catch (error)
    {
      console.log(error)
      return res.status(500).send(error);
    }
  })();

})

app.get('/publiccomplaintgroupbydata' , async (req,res) =>{
  let data=[];
  const tempDoc = [];
  await db.collection('Departments')
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      
   }); 
  let totalDep=0;
  console.log(tempDoc.length)
  for (let index = 0; index < tempDoc.length; index++) {
     var ComplainsCollection = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);

     var ComplainsCollection1 = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);

     var ComplainsCollection2 = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);

      await ComplainsCollection.where("ComplainType", 'in', ["Public",'public']).where("ComplainStatus", "==", "Raise").get().then(reslut =>{
        count = reslut.size;
        tempDoc[index].totalRaiseComplains = count;
        ComplainsCollection1.where("ComplainType", 'in', ["Public",'public']).where("ComplainStatus", "==", "In Progress").get().then(reslut1 =>{
          console.log(reslut1);
          count = reslut1.size;
          tempDoc[index].totalWipComplains = count;

          ComplainsCollection2.where("ComplainType", 'in', ["Public",'public']).where("ComplainStatus", "==", "Completed").get().then(reslut2 =>{
            console.log(reslut2);
            count = reslut2.size;
            tempDoc[index].totalCompletedComplains = count; 
            totalDep=totalDep+1;
            if(totalDep == tempDoc.length){ 
              console.log(tempDoc)
              return res.status(200).send({data: tempDoc});
            }
          });
        });
        
      }); 
  }  
})

app.get('/complaintgroupbydata' , async (req,res) =>{
  let data=[];
  const tempDoc = [];
  await db.collection('Departments')
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      
   }); 
  let totalDep=0;
  console.log(tempDoc.length)
  for (let index = 0; index < tempDoc.length; index++) {
     var ComplainsCollection = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);

     var ComplainsCollection1 = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);

     var ComplainsCollection2 = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);

      await ComplainsCollection.where("ComplainStatus", "==", "Raise").get().then(reslut =>{
        count = reslut.size;
        tempDoc[index].totalRaiseComplains = count;
        ComplainsCollection1.where("ComplainStatus", "==", "In Progress").get().then(reslut1 =>{
          console.log(reslut1);
          count = reslut1.size;
          tempDoc[index].totalWipComplains = count;

          ComplainsCollection2.where("ComplainStatus", "==", "Completed").get().then(reslut2 =>{
            console.log(reslut2);
            count = reslut2.size;
            tempDoc[index].totalCompletedComplains = count; 
            totalDep=totalDep+1;
            if(totalDep == tempDoc.length){ 
              console.log(tempDoc)
              return res.status(200).send({data: tempDoc});
            }
          });
        });
        
      }); 
  }  
})

app.get('/complaintgroupbydata/:id' , async (req,res) =>{
  let data=[];
  const tempDoc = [];

  const document = db.collection('Users').doc(req.params.id);
  let Complaint = await document.get();
  let response = Complaint.data();
  
  console.log(response);
  if(response.UserRoleID=="ZmCXkZ7lvHq709vewPBk"){
    const depo = db.collection('Departments').doc(response.UserDepartmentId);

    let department =  await depo.get();
    tempDoc.push({ id: response.UserDepartmentId, ...department.data()});

  } else {
    await db.collection('Departments')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           tempDoc.push({ id: doc.id, ...doc.data() })
        })
        
     }); 
  }
  let totalDep=0;
  console.log(tempDoc.length)
  for (let index = 0; index < tempDoc.length; index++) {
      
      var ComplainsCollection = db.collection('Complains').where("ComplainDepartmentID", "==", tempDoc[index].id);
      if(response.UserRoleID=="hqvWoXWRqePiznmneyj5"){
        ComplainsCollection = ComplainsCollection.where("ComplainUserID", "==", req.params.id);
      }
      
      await ComplainsCollection.where("ComplainStatus", "==", "Raise").get().then(reslut =>{
        count = reslut.size;
        tempDoc[index].totalRaiseComplains = count;
        ComplainsCollection.where("ComplainStatus", "==", "In Progress").get().then(reslut1 =>{
          //console.log(reslut1);
          count = reslut1.size;
          tempDoc[index].totalWipComplains = count;

          ComplainsCollection.where("ComplainStatus", "==", "Completed").get().then(reslut2 =>{
            //console.log(reslut2);
            count = reslut2.size;
            tempDoc[index].totalCompletedComplains = count; 
            totalDep=totalDep+1;
            if(totalDep == tempDoc.length){ 
              //console.log(tempDoc)
              return res.status(200).send({data: tempDoc});
            }
          });
        });
        
      }); 
  }  
})

app.post('/')

module.exports = app;