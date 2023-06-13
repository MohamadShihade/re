import React from 'react'
import { useMemo } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import { china, india, oman, south_korea, thailand, veitnam } from './data';

const DropDown =  ({item , onChange ,onNodeToggle ,onAction }) => {
    let tree =[];    
    switch (item) {
        case "China":
            tree = china
            break;
             case "India":
            tree = india
            break; 
            case "South korea":
            tree = south_korea
            break;
             case "Veitnam":
            tree = veitnam
            break;
            case "Thailand" :
            tree = thailand
            break
            case "Oman":
            tree = oman
            break;
            
        default:
            break;
    }

    const dropdown = useMemo(()=>{
      return (
    <DropdownTreeSelect
                            texts={{
                              placeholder: JSON.stringify(item),
                            }}
                            data={tree}
                            onChange={onChange}
                            onNodeToggle={onNodeToggle}
                            className='mdl-demo'
                            onAction={onAction}
                          />
  )
    },[])

  return (
   dropdown
  )
}

export default DropDown