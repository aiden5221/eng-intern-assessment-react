import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch'
import { Button, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import LapTable from './LapTable';

export default function App() {
    const [time, setTime] = useState<string[]>(['00','00','00','00']);
    const [lapTime, setLapTime] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<string[]>([])
    const [startTime, setStartTime] = useState(0)
    const [lapStartTime, setLapStartTime] = useState(0)

    const [stopTime, setStopTime] = useState(0)

    function padWithZero(number: number, maxLength: number = 2): string {
        const paddedNumber = String(number).padStart(maxLength, '0');
        return paddedNumber.slice(-maxLength); // Ensure the length is at most maxLength
    }
      
    function formatTimeDifference(date1: number, date2: number): string[] {
        // Calculate the time difference in milliseconds
        const timeDifference = Math.abs(date1 - date2);
        
        // Calculate hours, minutes, seconds, and milliseconds
        const hours = Math.floor(timeDifference / 3600000); // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
        const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60 seconds * 1000 milliseconds
        const seconds = Math.floor((timeDifference % 60000) / 1000);
        const milliseconds = timeDifference % 1000;
        
        // Format the result as HH:MM:SS:MS
        const formattedTime = [
            padWithZero(hours),
            padWithZero(minutes),
            padWithZero(seconds),
            padWithZero(milliseconds, 3)
        ];
        
        return formattedTime;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            var elapsedTime
            var elapsedTimeLap
            if(isRunning){
                console.log('isLapStart Time 0:', lapStartTime == 0)
                const currentTime = new Date();
                elapsedTime = formatTimeDifference(currentTime.getTime(), startTime)
                elapsedTimeLap = formatTimeDifference(currentTime.getTime(), lapStartTime)
                setLapTime(elapsedTimeLap.join(':'));
                
                setTime(elapsedTime);
            }
            else{
                return
            }
        }, 300);
        return () => {
          clearInterval(intervalId);
        };
    }, [isRunning, lapStartTime]);

    // Functions to handle Run, Stop, and Reset functionality
    const handleStart = () => {
        setIsRunning(true)
        if(stopTime !== 0 && startTime !== 0){
            setStartTime(startTime - (stopTime - new Date().getTime()))
            setLapStartTime(lapStartTime - (stopTime - new Date().getTime()))
            return
        }
        setStartTime(new Date().getTime())
        setLapStartTime(new Date().getTime())
        setStopTime(0)
    }

    const handleStop = () => {
        setIsRunning(false)
        setStopTime(new Date().getTime())
    }

    const handleReset = () => {
        setTime(['00','00','00','00'])
        setStartTime(0)
        setLapTime('')
        setLaps([])
    }

    const handleLap = () => {
        setLapTime('')
        setLapStartTime(new Date().getTime())

        setLaps([lapTime == '' ? '00:00:00:69' : lapTime, ...laps])
    }

    const buttonStyles = {
        borderRadius: 50, 
        height:'100px', 
        width:'100px'
    }

    return(
        <Grid2 container >
            <Grid2 xs={12}>
            <StopWatch timeValue={time} timeStart={startTime} />
            <Stack direction='row' spacing={2} sx={{justifyContent:'center', marginTop:'2vh'}} >

                {
                    isRunning ?
                    <Button onClick={handleStop} variant='contained' color='error' sx={ buttonStyles }>
                        Stop
                    </Button>
                    :
                    <Button onClick={handleStart} disabled={isRunning} color='success' variant='contained' sx={ buttonStyles }>
                        Start
                    </Button>
                }

                {
                    isRunning ?
                    <Button onClick={handleLap} variant='contained' color='info' sx={ buttonStyles }>
                        Lap
                    </Button>
                    :
                    <Button onClick={handleReset} variant='contained' color='warning' sx={ buttonStyles }>
                        Reset
                    </Button>
                    
                }
            </Stack>
            </Grid2>
            <Grid2 xs={10} xsOffset={1} sx={{'marginTop': '2vh'}}>
                <LapTable time={lapTime} laps={laps}/>
            </Grid2>
        </Grid2>
    )
}