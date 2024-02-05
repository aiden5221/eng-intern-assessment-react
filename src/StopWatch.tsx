import { Typography, withStyles } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import React, { useEffect, useState } from 'react'
import AnimatedNumbers from "react-animated-numbers";


type StopWatchProps = {
    timeValue: string[],
    timeStart: number
}


export default function StopWatch({ timeValue, timeStart }: StopWatchProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressValue = (parseInt(timeValue[2]) % 60) / 60 * 100;
        setProgress(progressValue);
    }, [timeValue]);


    // function secondsToTime() {
    //     const minutes = (timeValue / 60) % 60;
    //     const remainingSeconds = timeValue % 60;
    //     return { minutes, remainingSeconds };
    // }

    // const getHours = () => {
    //     if(timeValue === 0) return '00';
    //     if(timeValue / 3600 < 10) return `0${Math.floor(timeValue / 3600)}`;
    // }

    // const getMinutes = () => {
    //     const minutes = Math.floor((timeValue / 60) % 60)
    //     if(minutes === 0) return '00';
    //     if(minutes < 10) return '0' + minutes;
    //     return minutes.toString(); // Convert to string
    // }

    // const getSeconds = () => {
    //     if(timeValue === 0 || timeValue % 60 === 0) return '00';
    //     if(timeValue % 60 < 10) return '0' + (timeValue % 60).toString(); // Convert to string
    //     return (timeValue % 60).toString(); // Convert to string
    // }

    // const getMiliseconds = () => {
    //     const currentTime = new Date().getTime();
    //     const elapsedTime = currentTime - timeStart;
    //     return Number(elapsedTime % 1000).toFixed(2);
    // }

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
