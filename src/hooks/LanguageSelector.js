import React from "react";
import { Select } from '@chakra-ui/react'

const LanguageSelector = ({classN}) => {
    const [language, setLanguage] = React.useState(localStorage.getItem('i18nextLng').slice(0,2));
    
    const handleSelect = event => {
        localStorage.setItem('i18nextLng', event.target.value);
        window.location = window.location;
    }

  return (
    <Select
        onChange={handleSelect}
        // placeholder={language}
        size='md'
        maxWidth='10%'
        borderColor='#EBEBEB'
        backgroundColor='white'
        color='#335DE7'
        borderRadius='10'
        fontSize='18'
        className={classN}
        
    >
        <option value='pt-BR'>pt</option>
        <option value='en-US' selected={language === 'en' ? true : false}>en</option>
    </Select>
  )
}

export default LanguageSelector;

