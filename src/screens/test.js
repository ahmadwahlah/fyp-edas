import React from "react";

function test() {
  return <div>test</div>;
}

export default test;

/*


  const postFormData = async () => {
    const token = localStorage.getItem("token");
    const decodedPayload = jwt_decode(token);
    const id = decodedPayload.student.id || decodedPayload.faculty.id;
    const faculty =
      decodedPayload.student.faculty || decodedPayload.faculty.department;

    const combinedObjects = {
      ...inputValues,
      ...radioSelectedValue,
      ...selectedValue,
      ...dateValues,
      ...timeValues,
      ...selectedFiles,
    };

    const combinedArrays = Object.entries(checkboxSelectedValues)
      .concat(Object.entries(multiSelectedValues))
      .map(([id, item]) => ({ id, ...item }));

    const combinedArray = Object.entries(combinedObjects)
      .map(([id, item]) => ({ id, ...item }))
      .concat(combinedArrays);

    const responces = {
      combinedArray,
    };

    const payload = {
      responces,
      formName: form[0].formName,
      approvalHierarchy: form[0].approvalHierarchy,
      faculty,
    };

    console.log(payload)

    const fileInput = document.querySelector(
      'input[type="file"][name="formDocument"]'
    );
    const file = fileInput.files[0];

    const data = new FormData();
    data.append("formDocument", file);
    data.append("formName", form[0].formName);
    data.append("responces", JSON.stringify(responces));
    data.append("approvers", JSON.stringify(form[0].approvalHierarchy));
    data.append("faculty", faculty);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      };

      const response = await axios.post(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/",
        data,
        config
      );

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };


   case "fileUpload":
                        return (
                          <div key={field.id} style={{ marginBottom: "16px" }}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: "black" }}
                            >
                              {field.heading || "File Upload"}
                              {field.required && "*"}
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              fullWidth
                              startIcon={<CloudUploadIcon />}
                              onClick={() =>
                                inputRefs[field.id].current.click()
                              }
                            >
                              Upload
                            </Button>
                            <input
                              type="file"
                              id="formDocument"
                              name="formDocument"
                              required={field.required}
                              hidden
                              accept=".pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                              ref={inputRefs[field.id]}
                              onChange={(event) =>
                                handleFileSelect(event, field.id)
                              }
                            />
                            {selectedFiles[field.id] && (
                              <p style={{ marginTop: "8px" }}>
                                Selected file:{" "}
                                <strong>{selectedFiles[field.id].name}</strong>
                              </p>
                            )}
                          </div>
                        );



  const [selectedFiles, setSelectedFiles] = useState({});
  const [inputRefs, setInputRefs] = useState({});

  // Initialize inputRefs with the correct keys and Ref objects
  // Initialize inputRefs with the correct keys and Ref objects
  useEffect(() => {
    if (form && form[0] && form[0].fields) {
      const refs = {};
      form[0].fields.forEach((field) => {
        if (field.type === "fileUpload") {
          refs[field.id] = React.createRef();
        }
      });
      setInputRefs(refs);
    }
  }, [form]);

  const handleFileSelect = (event, id) => {
    const file = event.target.files[0];
    setSelectedFiles({ ...selectedFiles, [id]: file });
  };




*/
