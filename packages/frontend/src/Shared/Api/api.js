import { auth, storage } from "../../firebase";
import { toast } from "react-toastify";
import axios from "axios";

const client = axios.create({
  baseURL: "https://e-complainbox.herokuapp.com",
  json: true,
});
const imageupload =
  (
    { files, city, department, complainType, severity, subject, description },
    urls,
    setUrls,
    history
  ) =>
  async (dispatch) => {
    var len1 = files.length;
    let images = [];
    let completedCount = 0;
    for (var i = 0; i < len1; i++) {
      var image = files[i];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("error:-", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            images.push(downloadURL.toString());
            completedCount = completedCount + 1;
            console.log(completedCount);
            console.log(len1);
            if (completedCount == len1) {
              console.log(images);
              let data = {
                city: city,
                department: department,
                description: description,
                subject: subject,
                complainType: complainType,
                severity: severity,
                userid: localStorage.getItem("userID"),
                urls: images,
                token: localStorage.getItem("token"),
              };

              client({
                method: "post",
                url: "/createcomplaint",
                headers: {
                  AuthToken: localStorage.getItem("token"),
                },
                data: data,
              }).then(() => {
                history.push("/dashboard");
              });
            }
          });
        }
      );
    }
  };

const updateComplain = (
  { files, city, department, complainType, severity, subject, description },
  history,
  complianID
) => {
  try {
    let len1 = files && files.length;
    let images = [];
    let completedCount = 0;
    for (var i = 0; i < len1; i++) {
      var image = files[i];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("error:-", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            images.push(downloadURL.toString());
            completedCount = completedCount + 1;
            console.log(completedCount);
            console.log(len1);
            if (completedCount == len1) {
              console.log(images);
            }
          });
        }
      );
    }
    let data = {
      city: city,
      department: department,
      description: description,
      subject: subject,
      complainType: complainType,
      severity: severity,
      userid: localStorage.getItem("userID"),
      urls: images,
      token: localStorage.getItem("token"),
    };

    client({
      method: "put",
      url: `/updatecomplaint/${complianID}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
      data: data,
    })
      .then(() => {
        toast.success("The complain is updated");
        history.push("/dashboard");
      })
      .catch((error) => toast.error(error.message));
  } catch (error) {
    toast.error(error.message);
  }
};

const updateComplainStatus = async (complainStatus, userid, complianID) => {
  try {
    let data = {
      userid: userid,
      complainstatus: complainStatus,
    };
    client({
      method: "put",
      url: `/complaint/${complianID}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
      data: data,
    })
      .then(() => {
        toast.success("The status complain is updated");
      })
      .catch((error) => toast.error(error.message));
  } catch (error) {
    toast.error(error.message);
  }
};
const getSingleComplainData = async (id) => {
  try {
    const { data } = await client({
      method: "get",
      url: `/complaint/${id}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getComplainGroupData = async (userId) => {
  try {
    const { data } = await client({
      method: "get",
      url: `/complaintgroupbydata/${userId}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const departmentChange = (
  { department },
  complainStatus,
  userID,
  history,
  complianID
) => {
  try {
    let data = {
      department: department,
      complainstatus: complainStatus,
      userid: userID,
    };

    client({
      method: "put",
      url: `/complaint/${complianID}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
      data: data,
    })
      .then(() => {
        toast.success(`The complain is forwarded to ${department} department`);
        history.push("/dashboard");
      })
      .catch((error) => toast.error(error.message));
  } catch (error) {
    toast.error(error.message);
  }
};

const createComment = async (comment, userid, complianID) => {
  try {
    let data = {
      userid: userid,
      comments: comment,
    };
    client({
      method: "post",
      url: `/createcomments/${complianID}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
      data: data,
    })
      .then((data) => {
        toast.success("You have successfully created the comment");
        return data.data;
      })
      .catch((error) => toast.error(error.message));
  } catch (error) {
    toast.error(error.message);
  }
};

const getDashboardData = async (page, rowsPerPage, userType, userId) => {
  try {
    let data = null;
    if (userType === "department") {
      data = await client({
        method: "get",
        url: `/complaintbydep/${userId}/${page}/${rowsPerPage}`,
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
      });
    } else if (userType === "complainant") {
      data = await client({
        method: "get",
        url: `/complaintbyuser/${userId}/${page}/${rowsPerPage}`,
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
      });
    } else {
      data = await client({
        method: "get",
        url: `/getcomplaints/${page}/${rowsPerPage}`,
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
      });
    }
    console.log(data);
    return data.data.Complains;
  } catch (error) {
    console.log(error);
  }
};

const publicComplain = async (page, rowsPerPage) => {
  try {
    let data = null;
    data = await client({
      method: "get",
      url: `/publiccomplaints/${page}/${rowsPerPage}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
    });
    return data.data.Complains;
  } catch (error) {
    toast.error(error.message);
  }
};

const getPublicComplainGroupData = async (userId) => {
  try {
    const { data } = await client({
      method: "get",
      url: `publiccomplaintgroupbydata`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCriticalComplain = async (severity, page, rowsPerPage) => {
  try {
    const { data } = await client({
      method: "get",
      url: `complaintsbyseverity/${severity}/${page}/${rowsPerPage}`,
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
    });
    return data.Complains;
  } catch (error) {
    toast.error(error.message);
  }
};
export {
  imageupload,
  getDashboardData,
  getSingleComplainData,
  getComplainGroupData,
  updateComplain,
  updateComplainStatus,
  createComment,
  departmentChange,
  publicComplain,
  getPublicComplainGroupData,
  getCriticalComplain,
};
