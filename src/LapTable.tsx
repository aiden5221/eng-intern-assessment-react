import { List, ListDivider, ListItem } from '@mui/joy'
import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

type LapTableProps = {
    laps?: Array<string>,
    time: string
}

export default function LapTable({ laps, time }: LapTableProps) {
    const [minLap, setMinLap] = useState(0)
    const [maxLap, setMaxLap] = useState(0)

    const textStyles = { color: 'white' }

    const getLapColor = (lap: number) => {
        var lapStyle = {
            color: 'white'
        }
        
        if(lap === minLap){
            lapStyle.color = 'green'
        }
        if(lap === maxLap){
            lapStyle.color = 'red'
        }

        return lapStyle
    }
    
    function convertTimestampToNumber(timestamp: string): number {
        const [hours, minutes, seconds, milliseconds] = timestamp.split(':').map(Number);
        return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
    }

    useEffect(() => {
        if(laps.length > 2){
            setMaxLap(convertTimestampToNumber(laps[0]))
            setMinLap(convertTimestampToNumber(laps[0]))
        }

    },[laps])

  
    return (
    <List
        variant="outlined"
        sx={{
        minWidth: 240,
        borderRadius: 'sm',
        color: 'white',
        maxHeight:'20vh',
        overflowY:'scroll',
        '&::-webkit-scrollbar': {
            width: '0.5em',
            display: 'none', // Hide scrollbar in WebKit browsers
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent', // Color of the thumb
        },
        
        }}
    >   

        <ListItem sx={{ display:'flex', justifyContent:'space-between'}}>
            <Typography sx={textStyles}>
                Lap {laps.length + 1}
            </Typography>
            <Typography sx={textStyles}>
                {
                    time == '' ?
                    '00:00:00:00'
                    :
                    time
                }
            </Typography>
        </ListItem>
 
        {
            laps.length !== 0
            &&
            laps.map((lap, index) => {


                var curLap = convertTimestampToNumber(lap)
                if(curLap < minLap && laps.length > 2){
                    console.log('hi')
                    setMinLap(curLap)
                }
                if(curLap > maxLap && laps.length > 2){
                    setMaxLap(curLap) 
                }

                return(
                    <div key={index}>
                        <ListDivider inset="gutter" />
                        <ListItem  sx={{ display:'flex', justifyContent:'space-between' }}>
                            <Typography sx={getLapColor(curLap)}>
                                Lap {laps.length - index}
                            </Typography>
                            <Typography sx={getLapColor(curLap)}>
                                {
                                    lap
                                }
                            </Typography>
                        </ListItem>
                    </div>
                )
            })
        }
    </List>
  )
}
