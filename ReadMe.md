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
        accessibility:true,
        tooltip:true,
        tooltipPosition:'top',
        tooltipTitle:true
      }
      let data = {
            month: 'May',
            year: '2021',
            list: [
              {
                day: 3,
                events: [
                  {
                    title: "Mr. Shir Bhagwan Bihani x 2 (IXB - DEL) I5 535 C5C74N Confirmed",
                    details:{
                      "Start Date":"25-12-2021",
                      "End Date":"31-12-2021"
                    }
                  }
                ]
              }

            ]
          }

    return (
        ....
        <SingleCalendarEvents  options={options} events={data}/>
    )
}
export default App;
```
In events property, whatever data you are sending, make sure that you are sending **month** & **year** with proper value. **list** can be empty. If list is empty send it as an empty array.

## **Tooltip**

```
const App = () => {
    let options = {
        ...
        tooltip:true,
        tooltipPosition:'top',
        tooltipTitle:true
      }
      let data = {
            month: 'May',
            year: '2021',
            list: [
              {
                day: 3,
                events: [
                  {
                    title: "Mr. Shir Bhagwan Bihani x 2 (IXB - DEL) I5 535 C5C74N Confirmed",
                    details:{
                      "Start Date":"25-12-2021",
                      "End Date":"31-12-2021"
                    }
                  }
                ]
              }

            ]
          }

    return (
        ....
        <SingleCalendarEvents  options={options} events={data}/>
    )
}
export default App;
```
Tooltip, from options need to be set, like  **true or false**, then the positions as **top, left, bottom, right** and finally if you wan to show event title in tooltip that is also possible by setting **tooltipTitle** as **true**.

**Event Details:** *details* under Events array details option is for showing data in tooltip.


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

## **Event List Onclick Event**
To have some functionalities like opening popup or routing details page, this library has provided a click event facility on each list item.
To achive that use **eventClick** and pass a function, here is the example below.
```
const App = () => {
    let [date, selectedMonth] = useState('');
    ...
    const handleEventClick = (data)=>{
      console.log('data', data);
      // write your code
    }
    return (
      ...
      <SingleCalendarEvents  eventClick={handleEventClick}  />
    )

```
You will get the all details of that event, what you are sending in **events** property

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
    --ec-mainWidth:100%; /*Determines the width of the main container*/
    --ec-calendarWidth:100%; /* set the width only for days and week names section */
    --ec-border:#dddddd; 

    /*if accessibility is true, these selected and selected-text variables will reflect*/ 
    --ec-selected:#8072d0; 
    --ec-selected-text:#ffffff;
}
```
## **Theming Tooltip** 
These are the css variables for theming the tooltip
```
    --ec-tooltipWidth: 250px; /*Width of tooltip*/
    --ec-tooltipHeight:200px; /*Height of tooltip*/
    --ec-tooltip-bg:#fff; /*Tooltip background color*/
    --ec-tooltip-fg:#0b386c; /*Tooltip text (foreground) color*/
    --ec-tooltip-title:18px; /*Tooltip title font size*/
    --ec-tooltip-list:16px; /*Tooltip list font size*/
    --ec-tooltip-border-radius: 8px; /*Border radius for tooltip box*/
```
## **Responsive with Media Query**
Here is a sample example for media query for responsiveness

```
@media only screen and (max-width: 768px) {
  :root {
    --ec-height: 150px; 
    --ec-mainWidth:600px; 
    --ec-calendarWidth:1000px;
  }

}
```
In this way you can create total responsiveness.

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
| **tooltip**  | **Boolean**  | *If true, it will enable the tooltip* | **true / false**|
| **tooltipPosition**  | **String**  | *Sets the position of tooltip, ***top*** is default value* | **top / left / bottom / right**|
| **tooltipTitle**  | **Boolean**  | *If true, it will show the event title on tooltip* | **true/false**|
| **eventMonth**  | **function**  | *It will return current month and year* | |
| **eventClick**  | **function**  | *It will return data of clicked event* | |

--------------------------------------------

## **Raise an Issue**
If you are facing any issue regarding installation and usage, raise your issue in **Git repo**. 
```
https://github.com/devsubhajit/react-single-calendar-events/issues
```
