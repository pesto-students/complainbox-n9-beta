import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  GET_PROFILE,
  APP_ERROR,
  LOADING,
} from "./types";
import { toast } from "react-toastify";
import { auth, storage } from "../../firebase";
import axios from "axios";
const client = axios.create({
  baseURL: "https://e-complainbox.herokuapp.com",
  json: true,
});

const register =
  ({ fullname, email, password, mobile }, history) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const registrationInfo = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const generateToken = await auth.currentUser.getIdToken(true);
      console.log(registrationInfo);
      console.log(generateToken);
      let data = {
        fullname: fullname,
        email: email,
        password: password,
        mobile: mobile,
        token: generateToken,
      };

      const response = await client({
        method: "post",
        url: "/registration",
        headers: {
          AuthToken: generateToken,
        },
        data: data,
      });
      console.log(response.data.message);
      localStorage.setItem("token", generateToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.message,
      });
      dispatch({
        type: LOADING,
        payload: false,
      });
      //push('/email-verification');
      history.push("/email-verification");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
const login =
  ({ email, password }, history) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };
    dispatch({
      type: LOADING,
      payload: true,
    });
    const newUser = {
      email,
      password,
    };
    const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement

    let isValidPhone = phoneRegex.test(email); //

    let idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmYmRmMjQxZTdjM2E2NTEzNTYwNmRkYzFmZWQyYzU1MjI2MzBhODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyc3QtcHJvamVjdC0yOWRkMSIsImF1ZCI6ImZpcnN0LXByb2plY3QtMjlkZDEiLCJhdXRoX3RpbWUiOjE2MzQ5MjQzMDUsInVzZXJfaWQiOiJScXJhMGd0aEk0UmlnY3lxRVZHZEowYnd0VkYzIiwic3ViIjoiUnFyYTBndGhJNFJpZ2N5cUVWR2RKMGJ3dFZGMyIsImlhdCI6MTYzNDkyNTE0MCwiZXhwIjoxNjM0OTI4NzQwLCJlbWFpbCI6InJhbWFuYXNhbmthcnZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJhbWFuYXNhbmthcnZAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bvChf2MvgobFjw5SL0dSpNGcFyVhFQcEQLU83m1axsk_k_bgpoI8dCA8I_PvCujihltXWXeNpnRJXxUffsk_51o8o06y9GVzrduL1-nOvuNNFFvv7XEJK1RFol746EU2Pk6tJVnSL2ZOxFqAQONxw6kpHNj3xdcskK1s3iv7kHroBbs15F0M_y_19_yGS0cVzkO31HCRUhbF43cwyiw6gQV3XAlwhQjPfcYOzDZQq5jwSy08_OFgLLcdqp9UT4t4bq-zthUkWa6WFCo57vqZLYjVEdQsipl4FFhkcYfWW8sJlHxBzby83ZRf10uktJg3mZRi0hnJZmSy3y10Qz0SJw";

    if (isValidPhone) {
      let data = {
        mobile: email,
      };
      const res = await client({
        method: "post",
        url: "/getemailbymobile",
        headers: {
          AuthToken: idToken,
        },
        data: data,
      });

      email = res.data.userEmail;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const generateToken = await auth.currentUser.getIdToken(true);
      localStorage.setItem("token", generateToken);
      let data = {
        email: email,
      };
      const response = await client({
        method: "post",
        url: "/userdata",
        headers: {
          AuthToken: generateToken,
        },
        data: data,
      });
      console.log(response.data.user[0]);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.user[0],
      });
      dispatch({
        type: LOADING,
        payload: false,
      });
      if (localStorage.getItem("userIsEmailVerified") == "No") {
        history.push("/email-verification");
      } else if (localStorage.getItem("userIsMobileVerified") == "No") {
        history.push("/mobile-verification");
      } else {
        history.push("/raise");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

const emailverifications =
  ({ OTP }) =>
  async (dispatch) => {
    try {
      let data = {
        email: localStorage.getItem("userEmail"),
        docId: localStorage.getItem("userID"),
        otp: OTP,
      };
      const response = await client({
        method: "post",
        url: "/emailverification",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
        data: data,
      });
      if (response.data.message == "success") {
        localStorage.setItem("userIsEmailVerified", "Yes");
        window.location.href = "/mobile-verification";
      } else {
        //('Invalid OTP!');
        //dispatch(setAlert("Invalid OTP", "danger"));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

const mobileverifications =
  ({ OTP }) =>
  async (dispatch) => {
    try {
      let data = {
        email: localStorage.getItem("userEmail"),
        docId: localStorage.getItem("userID"),
        otp: OTP,
      };
      const response = await client({
        method: "post",
        url: "/mobileverification",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
        data: data,
      }).then(function (response) {
        console.log(response.data.message);
        if (response.data.message == "success") {
          localStorage.setItem("userIsMobileVerified", "Yes");
          window.location.href = "/raise";
        } else {
          //dispatch(setAlert("Invalid OTP", "danger"));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

const loadUser = () => async (dispatch) => {
  // if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  // }
  try {
    let data = {
      email: localStorage.getItem("userEmail"),
    };
    const response = await client({
      method: "post",
      url: "/userdata",
      headers: {
        AuthToken: localStorage.getItem("token"),
      },
      data: data,
    });
    console.log(response.data.user[0]);
    dispatch({
      type: USER_LOADED,
      payload: response.data.user[0],
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
const logout = (history) => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
  history.push("/login");
};

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

// const getDashboardData = () => async (dispatch) => {
//   client({
//     method: "get",
//     url: "/getcomplaints",
//     headers: {
//       AuthToken: localStorage.getItem("token"),
//     },
//   }).then((res) => {
//     console.log(res);
//     //history.push("/dashboard");
//   });
// };
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

  // .then((res) => {
  //   setRows(res.data.Complains);
  //   setDataLoaded(!dataLoaded)
  // });
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

  // .then((res) => {
  //   setRows(res.data.Complains);
  //   setDataLoaded(!dataLoaded)
  // });
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
export {
  register,
  loadUser,
  login,
  logout,
  emailverifications,
  mobileverifications,
  imageupload,
  getDashboardData,
  getSingleComplainData,
  getComplainGroupData,
};
