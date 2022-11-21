import React from "react";
function Square (props){
    var squareStyle = {
        height: 50,
        backgroundColor: props.color
    };
    return (
            <div style={squareStyle}>
             {props.title}
             {props.content}
            </div>
    )
}

function Label (props){
        var labelStyle = {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 13,
            margin: 0
        };
        
        return (
            <p style={labelStyle}>{props.color}</p>
        );
}

function Card (props){
        var cardStyle = {
            height: 100,
            width: 1300,
            padding: 0,
            margin:0,
            backgroundColor: "#FFF",
            WebkitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)"
        };

        return (
            <div style={cardStyle}>
                <Square color={props.color} title={props.title}/> {props.content}
                {/* <Label color={props.color}/> */}
            </div>
        );
    }

export default Card
