import React, { useState } from 'react'
import {Button, Center, Stack, TextInput, Text, Anchor} from '@mantine/core';
import Service from '../utils/http';
import { QRCodeSVG } from 'qrcode.react';


const UrlShortener = () => {
    const [originalurl, setoriginalurl] = useState('');
    const [customLink, setcustomLink] = useState('');
    const [title, settitle] = useState('');
    const [expirydate, setexpirydata] = useState('');
    const [shortUrlData,setShortUrlData] = useState(null);

    const service = new Service();
    
    const getShortUrl = async ()=>
    {
        const response = await service.post('s',
            {
                customUrl : customLink,
                originalUrl: originalurl,
                expiresAt: expirydate,
                title
            }
        );
        console.log(response);
        setShortUrlData(response.data);
    }


  return (
   <Center style={{height:"90vh"}}>
    <Stack>

  {!shortUrlData ?
     <>
        <Text size="30px">Shorten Your Url here..</Text>

            <TextInput
            label="Original URL"
            placeholder='Enter your Url'
            withAsterisk
            onChange={(e) => setoriginalurl(e.target.value)}
            value={originalurl} radius={"md"}
            >

            </TextInput>

            <TextInput
            label="Customise Your Url (Optional)"
            onChange={(e) => setcustomLink(e.target.value)}
            value={customLink}
                radius={"md"}>
            </TextInput>

            <TextInput
            label="Title (Optional)"
            onChange={(e) => settitle(e.target.value)}
            value={title}
                radius={"md"}>
            </TextInput>

            <TextInput
            label="date of expiry (optional)"
            type='date'
            onChange={(e) => setexpirydata(e.target.value)}
            value={expirydate}
                radius={"md"}>
            </TextInput>

            <Button variant='outline' disabled={!originalurl} onClick={getShortUrl}>generate url</Button>

        </> :
        <>
        <Anchor href={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`}>
            {shortUrlData?.shortCode}
        </Anchor>
        
        <QRCodeSVG value ={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode} `}/>
        </>
        }
            </Stack>

        </Center>
  )
}

export default UrlShortener;