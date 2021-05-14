# React Single Calendar Events

## **Description:** 
**react-single-calendar-events** is a very useful and easy to use Event Calendar, no external dependency is needed for this. You can chagne theme of it's color, by simply editing css variables.

### **How to install?**
```
npm i react-single-calendar-events
```
### **Link with material icons**
Copy and paset this material icons cdn link on head tag.
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

### **Implementation**
```
import React, {useState} from 'react';
import SingleCalendarEvents from 'react-single-calendar-events';


const App = () => {
    let options = {
        positionX:'right',
        positionY:'top', 
        badge:'circle', 
        pattern:'alternate',
        fontSize:16,
        border:true,
        presentOnly:true,
        accessibility:true
      }
      let data = [
          {
            day:3,
            month:'May',
            year:'2021',
            events:[
              {
                title:"Demo Title for the event",
              }
            ]
          }
      ]

    return (
        ....
        <SingleCalendarEvents  options={options} events={data}/>
    )
}
export default App;
```

## **Get Selected Month and Year**
To get selected month and year by clicking on next and previous icon, 
use **eventMonth** property, here is the example below
```
const App = () => {
    let [date, selectedMonth] = useState('');
    ...
    return (
      ...
      <SingleCalendarEvents  eventMonth={selectedMonth} />
    )

```
You will get current month and year in this format **May,2020**


## **Theming:** 
On your css/ scss add this variables.
You can customize your theme color and height through this css variables.
```
:root {
    --ec-weekend: rgba(0, 0, 0, 0); /*Provide weekends border*/
    --ec-light: #ffffff;
    --ec-primary: #0b386c;
    --ec-secondary: #f55858;
    --ec-dark: #262769;

    /*if options pattern is alternate*/
    --ec-alternate-bg:#dbd8f0;
    --ec-alternate-bg-light:#eceaf5;

    /*Background of day name background, two different color will give alternate colors bg*/
    --ec-title-bg-light: #f1f1f1;
    --ec-title-bg: #f1f1f1;

    /*Only for title / header section*/
    --ec-title: #0b386c;
    --ec-header: #ffffff;

    /*main bg of each cell*/
    --ec-bg-main: #ffffff;
    
    
    --ec-today: #f55858; 
    --ec-event:#f3f3f3; /*event day color background*/
    --ec-disabled:#c2c1cc; /*color of disabled cells*/
    --ec-height: 200px; /*height of each day cell*/
    --ec-border:#dddddd; 

    /*if accessibility is true, these selected and selected-text variables will reflect*/ 
    --ec-selected:#8072d0; 
    --ec-selected-text:#ffffff;
}
```

## **Options**
| Properties  | Type | Description | Values |
| ------------- | ------------- | ------------- |------------- |
| **positionX**  | **String**  | *Set the position of day number horizontally* | **right / left**|
| **positionY**  | **String**  | *Set the position of day number vertically* | **top / bottom**|
| **badge**  | **String**  | *set the style of day number* default is **none** | **circle / square**|
| **pattern**  | **String**  | *having two different view, **Flat** is default* | **alternate**|
| **fontSize**  | **Number**  | *Sets the fontsize all in list, day numbers* | example: **fontSize:14**|
| **border**  | **Boolean**  | *sets border from css variables* | **true / false**|
| **presentOnly**  | **Boolean**  | *If true will show selected months days only* | **true / false**|
| **accessibility**  | **Boolean**  | *If true, it will have user interectivity evetns* | **true / false**|
| **eventMonth**  | **function**  | *It will return current month and year* | |

--------------------------------------------

## **Raise an Issue**
If you are facing any issue regarding installation and usage, raise your issue in **Git repo**. 
```
https://github.com/devsubhajit/react-single-calendar-events/issues
```
