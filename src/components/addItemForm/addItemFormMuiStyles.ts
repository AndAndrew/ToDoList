export const textFieldStyle = {
    // "& .MuiInputLabel-root": {color: 'coral'},
    "& .MuiOutlinedInput-root": {
        "& > fieldset": {borderColor: "coral"},
    },
    "& .MuiInputLabel-root.Mui-focused": {color: 'coral'},
    "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
            borderColor: "coral"
        }
    }
}