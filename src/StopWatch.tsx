import { Typography } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import React, { useEffect, useState } from 'react'
import AnimatedNumbers from "react-animated-numbers";


type StopWatchProps = {
    timeValue: string[]
}


export default function StopWatch({ timeValue }: StopWatchProps) {
    const [progress, setProgress] = useState(0);

    // Update the progress of the StopWatch as time passes
    useEffect(() => {
        const progressValue = (parseInt(timeValue[2]) % 60) / 60 * 100;
        setProgress(progressValue);
    }, [timeValue]);


    return (
        <div style={{ display:'flex', justifyContent:'center', }}>
            <CircularProgress
                value={progress}
                variant="soft"
                size='lg'
                determinate
                sx={{
                    "--CircularProgress-size": "80%",
                    'width':'800px',
                    'height':'800px',
                    '& .MuiCircularProgress-bar': {
                        animationDuration: '0.5s'
                    },
                    'rotate': '180deg',
                    '--CircularProgress-trackColor': 'rgba(255,255,255,0.1)',
                    'animation':'all 1s'
                  }}
            >   
            {/* 
                Below we get each index of the time value passed as a prop
                These values are the hours, minutes, seconds, and miliseconds
                We index each of these to animate the changing of the values using AnimatedNumbers
            */}
                <Typography variant='h1' sx={{ 'rotate': '-180deg', display:'flex', color:'white'}}>
                    {   
                        parseInt(timeValue[0]) == 0 ? '00' :
                        <AnimatedNumbers 
                        transitions={(index) => ({
                            type: "spring",
                            duration: index + 0.1,
                        })}
                        animateToNumber={parseInt(timeValue[0])}/>
                    }
                    :
                    {   
                        parseInt(timeValue[1]) === 0 ? '00' :
                        <AnimatedNumbers 
                            transitions={(index) => ({
                                type: "spring",
                                duration: index + 0.1,
                            })}
                            animateToNumber={parseInt(timeValue[1])}/>
                    }
                    :
                    {
                        parseInt(timeValue[2]) === 0 ? '00' :
                        <>
                        <AnimatedNumbers 
                            transitions={(index) => ({
                                type: "linear",
                                duration: '0.5',
                            })}
                            animateToNumber={parseInt(timeValue[2][0])}/>
                        <AnimatedNumbers 
                            transitions={(index) => ({
                                type: "spring",
                                duration: '0.2',
                            })}
                            animateToNumber={parseInt(timeValue[2][1])}/>

                        </>
                    }
                    :
                    {
                        parseInt(timeValue[3]) === 0 ? '00' :
                        <>
                        <AnimatedNumbers 
                        transitions={(index) => ({
                            type: "spring",
                            duration: '0.1',
                        })}
                        animateToNumber={parseInt(timeValue[3][0])}/>
                        <AnimatedNumbers 
                        transitions={(index) => ({
                            type: "spring",
                            duration: '0.1',
                        })}
                        animateToNumber={parseInt(timeValue[3][1])}/>
                        </>
                        
                    }
                </Typography>
            </CircularProgress>
        </div>
    )
}
