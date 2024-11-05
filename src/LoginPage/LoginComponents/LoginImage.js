import React from 'react'
import './LoginImage.css'
import vector_icon from '../../Icon/Vector.png'
import vector2_icon from '../../Icon/Vector2.png'
import vector3_icon from '../../Icon/Vector3.png'
import vector4_icon from '../../Icon/Vector4.png'
import border_color_icon from '../../Icon/border_color.png'
import forum_icon from '../../Icon/forum.png'
import business_messages_icon from '../../Icon/business_messages.png'
import edit_document_icon from '../../Icon/edit_document.png'
import mic_icon from '../../Icon/mic.png'

const LoginImage = () => {
  return (
    <div className="LoginImage-overlap-group-wrapper">
        <div className="LoginImage-overlap-group">
          <img
            className="LoginImage-vector"
            alt="Vector"
            src={vector_icon}
          />
          <img
            className="LoginImage-border-color"
            alt="Border color"
            src={border_color_icon}
          />
          <img
            className="LoginImage-forum"
            alt="Forum"
            src={forum_icon}
          />
          <img
            className="LoginImage-business-messages"
            alt="Business messages"
            src={business_messages_icon}
          />
          <img
            className="LoginImage-edit-document"
            alt="Edit document"
            src={edit_document_icon}
          />
          <img
            className="LoginImage-mic"
            alt="Mic"
            src={mic_icon}
          />
          <img
            className="LoginImage-vector-2"
            alt="Vector"
            src={vector2_icon}
          />
          <img
            className="LoginImage-vector-3"
            alt="Vector"
            src={vector3_icon}
          />
          <img
            className="LoginImage-vector-4"
            alt="Vector"
            src={vector4_icon}
          />
        </div>
      </div>
  )
}

export default LoginImage