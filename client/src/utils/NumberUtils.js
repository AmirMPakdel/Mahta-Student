
const showNumber=(number)=>{

    let temp = [...number.toString()].reverse().join('');
    let string ="";

    for(let i=0; i<temp.length; i++){

        if(i % 3 === 0 && i != 0){string += ","}
        string += temp[i];
    }

    return [...string].reverse().join('');;
}

export {showNumber}