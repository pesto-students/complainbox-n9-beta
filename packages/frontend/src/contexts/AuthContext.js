import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3030',
  json: true
})


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  

  function signup(email, password,phone,fullname,callback) {
    return auth.createUserWithEmailAndPassword(email, password).then(function(user) {
      var user = auth.currentUser;
      let data={
        fullname:fullname,
        email:email,
        password:password,
        mobile:phone
      }
      auth.currentUser.getIdToken(true).then((idToken) => {
        client({
          method: 'post',
          url: '/registration',
          headers: {
            'AuthToken': idToken
          },
          data: data
        }).then((res) => {
          console.log(res);
          callback("success");
          //return "success";
          //this.response = res.data.message
        }).catch((error) => {
          this.response = error
        })
      }).catch((error) => {
        callback("fail");
        this.response = "Error getting auth token"
      });
       
    }, function(error) {
      console.log(error);
      callback("fail");
      //return "fail";
    });
  }

  function login(email, password,callback) {
    const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
    let isValidPhone = phoneRegex.test(email); //
    let idToken="eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmYmRmMjQxZTdjM2E2NTEzNTYwNmRkYzFmZWQyYzU1MjI2MzBhODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyc3QtcHJvamVjdC0yOWRkMSIsImF1ZCI6ImZpcnN0LXByb2plY3QtMjlkZDEiLCJhdXRoX3RpbWUiOjE2MzQ5MjQzMDUsInVzZXJfaWQiOiJScXJhMGd0aEk0UmlnY3lxRVZHZEowYnd0VkYzIiwic3ViIjoiUnFyYTBndGhJNFJpZ2N5cUVWR2RKMGJ3dFZGMyIsImlhdCI6MTYzNDkyNTE0MCwiZXhwIjoxNjM0OTI4NzQwLCJlbWFpbCI6InJhbWFuYXNhbmthcnZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJhbWFuYXNhbmthcnZAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bvChf2MvgobFjw5SL0dSpNGcFyVhFQcEQLU83m1axsk_k_bgpoI8dCA8I_PvCujihltXWXeNpnRJXxUffsk_51o8o06y9GVzrduL1-nOvuNNFFvv7XEJK1RFol746EU2Pk6tJVnSL2ZOxFqAQONxw6kpHNj3xdcskK1s3iv7kHroBbs15F0M_y_19_yGS0cVzkO31HCRUhbF43cwyiw6gQV3XAlwhQjPfcYOzDZQq5jwSy08_OFgLLcdqp9UT4t4bq-zthUkWa6WFCo57vqZLYjVEdQsipl4FFhkcYfWW8sJlHxBzby83ZRf10uktJg3mZRi0hnJZmSy3y10Qz0SJw";
    console.log(isValidPhone);
    console.log("ramana")
    if(isValidPhone){
      let data={
        mobile:email
      }
      client({
        method: 'post',
        url: '/getemailbymobile',
        headers: {
          'AuthToken': idToken
        },
        data: data
      }).then((res) => {
        console.log(res.data.userEmail);
        email = res.data.userEmail
        auth.signInWithEmailAndPassword(email, password).then(function(user) {
          callback("success");
        },
        function(error) {
          console.log(error);
          callback("fail");
        });
      }).catch((error) => {
        callback("fail");
      })
    } 
    else
      auth.signInWithEmailAndPassword(email, password).then(function(user) {
        callback("success");
      },
      function(error) {
        console.log(error);
        callback("fail");
      });
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
