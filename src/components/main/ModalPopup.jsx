import React from "react";
import styled from "styled-components";
import Modal from "react-modal"
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../../src_assets/logo.png'
import OnFileUpload from "../../s3/FileUpload";


const ModalPopup = ({isOpen, closeModal}) => {
  const navigate = useNavigate();

  // request
  const [post, setPost] = useState({
    imageUrl: "",
    text: ""
  });

  //image 미리보기
  const [change, setChange] = useState(false);
  const [imageSrc, setImageSrc] = useState();

  const readFile = async (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve)=>{
      reader.onload=()=> {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // post 저장
  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (post.imageUrl==""||post.text==""){
      alert("내용을 기입해주세요")
      return
    }
    axios.post(`/post`, post)
    .then( res => {
        alert('포스팅 성공')
        window.location.reload()
    })
    .catch( error => {
      console.log(error)
      alert("로그인 이후 이용해주세요")
    })
    closeModal()    
  };

  return(
    <Modal 
        style={customStyles}
          isOpen={isOpen}
          onRequestClose={closeModal}
        ariaHideApp={false}
    >
        <StModalForm>
          <StModalImage>
            {
              change ?
              <img src={imageSrc} alt='이미지를 불러올 수 없습니다'/>
              :<img src={logo} alt='이미지를 불러올 수 없습니다'/>
            }
          </StModalImage>
          <StModalFileUpload
            required
            type='file'
            accept="image/jpeg, image/jpg, image/png"
            onChange={(e) => {
              OnFileUpload(e)
              readFile(e.target.files[0])
              setChange(true)
              setPost({...post, imageUrl:e.target.files[0].name},{});
            }}
          />
          <StModalText
            required
            maxLength={150}
            placeholder="내용을 입력하세요. (최대 150자)"
            onChange={(e) => {
              const {value} = e.target;
              setPost({...post, text: value},{});
            }}
          />
          <StModalBtns>
            <button onClick={onSubmitHandler}>저장</button>
            <button onClick={(e) => {
              e.preventDefault()
              window.location.reload()
            }}>닫기</button>
          </StModalBtns>
        </StModalForm>
    </Modal>
  )
}

export default ModalPopup

const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(43, 34, 34, 0.55)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#ffd9df",
      width: "350px",
      height: '550px',
      top: "50%",
      left: "50%",
      right: "0px",
      bottom: "0px",
      transform: 'translate(-50%, -50%)',
      borderRadius: "7px",
      outline: "none",
      zIndex: 10,
    },
};

const StModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StModalImage = styled.div`
  background-color: #eeeeee;
  border-radius: 7px;
  width: 300px;
  height: 300px;

  & img{
    width: 300px;
    height: 300px;
    border-radius: 7px;
    object-fit: cover;
}
`

const StModalFileUpload = styled.input`
  margin-top: 10px;
  cursor: pointer;
`

const StModalText = styled.textarea`
  resize: none;
  width: 300px;
  height: 120px;
  border: solid 5px #ffffff;
  border-radius: 7px;
  background: none;
  margin-top: 10px;
  padding: 10px;
  font-weight: 700;
    :focus {outline:none}
`

const StModalBtns = styled.div`
  width: 210px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  display: flex;
  
  & button{
    width: 100px;
    height: 30px;
    margin: 5px;
    cursor: pointer;
  } 
`