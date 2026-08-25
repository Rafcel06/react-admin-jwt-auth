import React, { useEffect } from 'react'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import useModal from '../customHooks/useModal';
import { Form, useForm } from 'react-hook-form';
import useBackDrop from '../customHooks/useBackDrop';
import "../css/formStyle.css";
import { useState } from 'react';
import useFetch from '../customHooks/useFetch';
import MessageAlert from './messageComponents/MessageAlert'
import useLocalStorage from '../customHooks/useLocalStorage';
import useSnackBar from '../customHooks/useSnackBar';
import { useRef } from 'react';
import { data, useOutletContext } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../constants/constant';
import AddBoxIcon from '@mui/icons-material/AddBox';
import user from '../images/user-logo.png'

const Analytics = () => {

   const  {RenderModal, showModalElement, hideModalElement} = useModal()
   const { fetchState, setFetchState, getData, getDataNoAuth, postData, updateData, deleteData} = useFetch('users')
   const {getSecureStorage}  = useLocalStorage()
   const [tableData, setTableData] = useState()
   const { handleSubmit, reset,register ,formState} = useForm()
   const { errors } = formState;
   const formUserRef = useRef(null)
   const [fileState, setFileState] = useState(false)
   const {BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()
   const [submitState, setSubmitState] = useState({ post : true, edit : false, delete : false })
   const {showAlert, hideAlert, RenderSnackBarSuccess, RenderSnackBarFailed} = useSnackBar()
   const [deleteId,setDeleteId] = useState(null)
   const [currentMatchDelete,setCurrentMatchDelete] = useState(false)
   const [existingEmail,setExistingEmail] = useState(false)
   const [userImageExist,setUserImageExist] = useState("")
   const [editId,setEditId] = useState(null)
   const {userData,setUserData} = useOutletContext()
   const [editState,setEditState] = useState(false)
   const [offset,setOffset] = useState(0)
   const [limit,setLimit] = useState(5)
   const [ownData,setOwnData] = useState(false)
   const [allCountry,setAllCountry] = useState([])
   const [accountType,setAccounType] = useState(ACCOUNT_TYPE)
   const { id } = getSecureStorage(process.env.REACT_APP_STORAGE_KEY).user
   const [searchName,setSearchName] = useState('')


    const addUser = () => {

       setEditState(false)
       resetFormField()
       setSubmitState({post:true,edit:false,delete:false}) 
       showModalElement()
       setUserImageExist('')
     
    }

    const editUser = (editData) => {


        showModalElement()
        setEditState(true)
        setEditId(editData.id)
        setUserImageExist("")
        reset({
           first_name:editData.first_name,
           last_name : editData.last_name,
           phone : editData.phone,
           image : editData.image,
           email : editData.email,
           username : editData.username,
           account_type : editData.account_type,
           country : editData.country
          })
        setUserImageExist(editData.image)
        setSubmitState({post:false,edit:true,delete:false})
      
    }



    useEffect(() => {
      
     getDataNoAuth(process.env.REACT_APP_COUNTRY_URL)
     .then((response) => {
        setAllCountry(response.data)
     })
     .catch((err) => {
      console.log(err)
     })

    },[])

    const deleteUser = (data) => {

         setCurrentMatchDelete(false)
         showModalElement()
         setSubmitState({post:false,edit:false,delete:true}) 
         setDeleteId(data.id)
         setFetchState((prevState) => !prevState)

        //  add this only in user table

          if(id === data.id) {
               setCurrentMatchDelete(true)
          }

    }




    const resetFormField = () => {
      reset({
        first_name :'', 
        last_name : '',
        phone : '',
        email : '',
        username : '',
        country : '',
        account_type : '',
        image : null
        })
        setFileState(false)
        return
    }

    const handleClickSubmitForm = () => {
        formUserRef.current.requestSubmit()
    } 


    const submit = (data) => {


      setExistingEmail(false)

      
      const formData = new FormData()


          formData.append('first_name', data.first_name)
          formData.append('last_name', data.last_name)
          formData.append('account_type', data.account_type)
          formData.append('username', data.username)
          formData.append('country', data.country)
          formData.append('email', data.email)
          formData.append('phone', data.phone)
          formData.append('image', (data.image ? data.image[0] : null))
          // formData.append('password', data.password)
      

      if(submitState.post === true && submitState.edit === false && submitState.delete === false) {

          showBackDrop()
      
          postData(`admin/register`,formData)
          .then((response) => { 
             if(response.data.message === "Email is not available"){
                 setExistingEmail(true)
                 hideBackDrop()
                
                 return
             }
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
            resetFormField()
            setUserImageExist('')
            
          })
          .catch((err) => {
            setFetchState(true)
            // hideModalElement()
            hideBackDrop()
          })
          setFetchState(false)
          return
      }

      if(submitState.post === false && submitState.edit === true && submitState.delete === false) {
      
          showBackDrop()



          updateData(`update-profile/${editId}`,formData)
          .then((response) => { 
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
            setEditId(null)
            setEditState(false)
            setUserImageExist('')
            resetFormField()

            if(id === editId) {
                setOwnData((prevState) => !prevState)
            } 
            
          })
          .catch((err) => {
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
            setEditId(null)
            setEditState(false)
      
          })
          setFetchState(false)
          return 
      }
      showBackDrop()
    }

      const deleteRecordUser = () => {

          let selectedId = deleteId

  
          deleteData(`delete-profile/${selectedId}`)
          .then((response) => { 
             setFetchState()
             setDeleteId(null)
             hideBackDrop()
             hideModalElement()
             setUserImageExist('')
             setSubmitState({post:true,edit:false,delete:false}) 
          })
          .catch((err) => {
            
            setDeleteId(null)
            hideBackDrop()
            hideModalElement()
            setSubmitState({post:true,edit:false,delete:false}) 
          })
    }   

    const renderImageFile = (e) => {

          let file = e.target.files[0]
          setFileState(file.name)
          let reader = new FileReader(file)
          reader.onload = function(e) {
              setUserImageExist(e.target.result)
          }
          reader.readAsDataURL(file)
  }


  const handleCancelSubmit = () => {
      setUserImageExist('')
      hideModalElement()  
      reset()
      setFileState(false)
  }


  const handlePagination = (e) => {
      setLimit(e.target.value)
      setOffset(0)
  }


  const handleFilterSearch = (e) => {
    setSearchName(e.target.value)
  }

  let timeout;

  useEffect(() => {

  
    if(searchName) {
       timeout = setTimeout(() => {
        getData('client?' + 'name=' + searchName)
        .then((response) => {
        setTableData(response.data)
      })
      .catch((err) => console.log(err))
   }, 500); 
    }
 

    return () => {
      clearTimeout(timeout)
    }

  },[searchName,fetchState])

 
  useEffect(() => {
        getData(`users/${id}`)
       .then((response) => {
        setUserData(response.data.data[0])
        
       })
       .catch((err) => console.log(err))
     return () => {
    }

  },[ownData])


  useEffect(() => {

      if(searchName) {
           return
      }

       getData(`users/${limit}/${offset}`)
       .then((response) => {
        setTableData(response.data)
       })
       .catch((err) => console.log(err))

  },[fetchState,limit,offset,searchName])



  return (
    <>
    <div className='tab-headers'>
               <h2>Employee: Records</h2>
               <button className='table-headers-action' onClick={addUser}><AddBoxIcon/> Add Employee</button>
             </div>
             <div className='table-contain'>
                      {
                  !tableData? null :

                  <div className='table-footer'>
                   <div className='pagination-container'>
                    <p>Show</p>
                    <select className="form-select" onChange={handlePagination}>
                           <option value="5" className="select-value">5</option>
                           <option value="10" className="select-value">10</option>
                           <option value="100" className="select-value">100</option>
                    </select>
                    <p>Entries</p>
                   </div>


                    <div className='pagination-container'>
                      <p>Search : </p>
                      <div className="input-contain action-input-contain">
                      <input type="text" className="input-text action-input" placeholder='Username ' onChange={(e) => handleFilterSearch(e)}/>
            
                </div>
                   </div>
                </div>

                }

              <table className='table-container'>
                <thead> 
                <tr className='table-header'>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Account type</th>
                    <th className='table-action'>Action</th>
                </tr>

                </thead>
                <tbody>
                  { tableData?.data.length === 0  || !tableData ? <tr className='table-no-content'><td colSpan={7} className='row-no-content'>No records found</td></tr> : null  }
                  
                    {
                       

                      tableData?.data.map((mapped) => {
                        return  tableData?.data?.length ? <tr key={mapped?.id}>
                            <td> 
                              <img src={mapped?.image ? mapped?.image :  user} className='table-image' alt="" />
                            </td>
                       
                          <td>{mapped?.username}</td>
                          <td>{mapped?.username}</td>
                          <td>{mapped?.country}</td>
                          <td>{mapped?.email}</td>  
                          <td>{mapped?.account_type}</td>
                          <td className="table-action"> 
                              <button type="button"className="action-btn" onClick={() => editUser(mapped)} ><EditSquareIcon/></button>
                              <button type="button"className="action-btn red-btn " onClick={() => deleteUser(mapped)}><DeleteIcon/></button>
                         </td>
                </tr>
 
                :  null
                 
                      })
                    }
                
               
          
           
                </tbody>

             </table>

        
                
       
                <RenderModal element={ submitState.delete ? <MessageAlert method={{cancel:hideModalElement,confirm: deleteRecordUser, currentDeleteState : currentMatchDelete}}/> :
                  <>

              <h2 className='form-title'>{submitState.post ? 'Add user' : 'Edit user'}</h2>
               
              <form className="form"  ref={formUserRef} onSubmit={handleSubmit(submit)}>

  
  
                 <div className="input-contain">
                  <label htmlFor="country" className='input-label'>Country</label>
  
                     <select className="form-select-option" placeholder="country" defaultValue="" {...register('country', {
                      required : {
                      value : editState ? false : true,
                      message : '*Country is required',
                     }
                     })}>

                      {
                          allCountry.map((mapped, __) => {
                               return  (
                        
                                  <option key={__} value={mapped?.name} className="select-value" >{mapped?.name}</option>
                               )
                            
                         })
                      }
                        <option value='' className="select-value" defaultValue=''></option>
  
                    </select>
                      <p className="form-errors">{errors.country?.message}</p>
                </div>


                  <div className="input-contain">
                  <label htmlFor="country" className='input-label'>Account Type</label>
          

                      <select className="form-select-option" placeholder="country"  {...register('account_type', {
                      required : {
                       value : editState ? false : true,
                       message : '*Account Type is required',
                     }
                     })}>

                      {
                        accountType ? accountType.map((mapped,__) => {
                           return (
                             <option value={mapped} key={__} className="select-value" >{mapped}</option>
                           )
                        })
                        
                        
                        : null
                      
                      }
                
              
             
                    </select>
   
                     <p className="form-errors">{errors.account_type?.message}</p>
                </div>

                     <div className="input-contain">
                  <label htmlFor="Username" className='input-label'>Username</label>
                   <input type="text" className="input-text" placeholder="Username" {...register('username', {
                      required : {
                      value : editState ? false : true,
                      message : '*Username is required',
                     },
       
                     })}/>
                      <p className="form-errors">{errors.username?.message}</p>
                </div>

                  <div className="input-flex-contain">
                      
          

                      <div className="input-contain">
                        <label htmlFor="last_name" className='input-label'>Last Name</label>
                        <input type="text" className="input-text" placeholder="Last name" {...register('last_name', {
                           required : {
                           value : editState ? false : true,
                           message : '*Last name is required',
                           },
                         })}/>
                          <p className="form-errors">{errors.last_name?.message}</p>
                     </div>

                              <div className="input-contain">
                         <label htmlFor="first_name" className='input-label'>First Name</label>
                         <input type="text" className="input-text" placeholder="First name" {...register('first_name', {
                            required : {
                            value : editState ? false : true,
                            message : '*First name is required',
                            },
                          })}/>
                           <p className="form-errors">{errors.first_name?.message}</p>
                      </div>

                </div>


                <div className="input-contain">
                  <label htmlFor="email" className='input-label'>Email</label>
                   <input type="email" className="input-text" placeholder="Email" {...register('email', {
                      required : {
                      value : editState ? false : true,
                      message : '*Email is required',
                     },
                     pattern : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
                     })}/>
                    <p className="form-errors">{errors.email?.message}</p>
                </div>

                  <div className="input-contain">
                  <label htmlFor="Phone" className='input-label'>Contact number</label>
                   <input type="number" className="input-text" placeholder="Contact number"  {...register('phone', {
                      required : {
                      value : editState ? false : true,
                      message : '*Contact number is required'
                     },
                      //  validate: (value) => {
                      //       if (!value && editState) return true; 
                      //       return value.toString().length >= 11 || '*Contact number must be at least 11 digits';
                      //  }
                     })}/>
                      <p className="form-errors">{errors.phone?.message}</p>
                </div>

           
            
                 {/* <div className="input-contain">
                  <label htmlFor="password" className='input-label'>Password</label>
                   <input type="password" className="input-text" placeholder="Password" {...register('password', {
                      required : {
                      value : editState ? false : true,
                      message : '*Password is required',
                     },
                     
                     })}/>
                    {existingEmail ? <p className="form-errors">Email is not available</p> :  <p className="form-errors">{errors.password?.message}</p>}
                </div> */}


                    <div className="input-contain input-contain-margin-bottom">
                      <label htmlFor="profile" className='input-label'>Photo</label>
                     <label className="custum-file-upload" htmlFor="file">
                      
                       {
                         !userImageExist ?  <div className='file-logo-contain'>
                    
                          <div className="icon"> 
                             <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                           </div>

                          <div className="text">
                            <span>{ fileState ? fileState : 'Click to upload image'}</span>
                          </div>
                      </div> : 
                       <div className='file-image-contain'>
                          <img  src={userImageExist} alt=""  className='file-image'/>
                      </div> 
                      }

                
                       
                      <input type="file" id="file"  {...register('image', {
                         onChange: (e) => renderImageFile(e),
                      })
                      }/>
                    </label>
                    
                </div>


              
            
             
            </form>

             <div className='form-btn-contain'>
                  <button type="button" className="form-btn" style={btnStyle} disabled={backDropState} onClick={handleClickSubmitForm}>{ backDropState ? <BackDropModal/> : 'Submit'}</button>
                  <button type="button" className="form-btn" onClick={() => handleCancelSubmit()}>Cancel</button>
               </div>

                    </>
                   } />
  
             </div>
    </>
  )
}

export default Analytics