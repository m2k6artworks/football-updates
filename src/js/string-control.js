export default class StringControl {
    static toStringDate(date) {
        const monthArray = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        return `${date.getDate()} ${monthArray[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    static toStringFullDate(date) {
        const monthArray = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
        ];
        const hour = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
        const minute = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    
        return `${date.getDate()} ${monthArray[date.getMonth()]} ${date.getFullYear()} ${hour}:${minute}`;
    }
}