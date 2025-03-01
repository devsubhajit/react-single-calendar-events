import React, { useState, useEffect } from 'react';
import './SingleCalendarEvents.css';

const SingleCalendarEvents = (props) => {
    const [count, setCount] = useState(0);
    let [options, setOptions] = useState(props.options);
    let [events, setEvents] = useState([]);
    let [propMonth, setPropMonth] = useState('');
    let [propYear, setPropYear] = useState('');
    let [calendar, setCalender] = useState({ prevDays: [], currentDays: [], nextDays: [] })
    let [date, setToDate] = useState(new Date());
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let [clicked_date, setClickedDate] = useState('');
    let [selectedMonth, setSelectedMonth] = useState('');
    let [selectedYear, setSelectedYear] = useState('');
    let [tooltipPositionClass, setTooltipPositionClass] = useState(props.options.tooltipPosition);
    let [isToolTip, setToolTip] = useState(false);
    let [tooltipTop, setTooltipTop] = useState(0);
    let [tooltipLeft, setTooltipLeft] = useState(0);
    let [tooltipDetails, setToolTipDetails] = useState({})
    let [selectedDate, handleSelectDate] = useState('');

    console.log('props', props);
    useEffect(() => {
        setEvents(props.events.list);
        setPropMonth(props.events.month);
        setPropYear(props.events.year);

        setToDate({ month: props.events.month, year: props.events.year });


    }, [props.events]);

    setToDate = (type) => {
        if (type === 'next') {
            date.setMonth(date.getMonth() + 1);
        } else if (type === 'prev') {
            date.setMonth(date.getMonth() - 1);
        } else {
            date.setMonth(months.map(item => { return item }).indexOf(type.month))
            date.setFullYear(type.year)
        }
    }

    setCalender = (v) => {

        let cal_obj = {};
        if (v === 1)
            date.setDate(1);

        let firstDayIndex = date.getDay();
        let prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        let local_currentDays = [];
        let num = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= num; i++) {
            local_currentDays.push(i)
        }
        cal_obj.currentDays = local_currentDays;

        let local_prevDays = [];
        for (let x = firstDayIndex; x > 0; x--) {
            local_prevDays.push(prevLastDay - x + 1);
        }
        cal_obj.prevDays = local_prevDays;

        // nextDays = [];
        let local_nextDays = [];
        let num2 = 42 - (cal_obj.currentDays.length + firstDayIndex);
        for (let j = 1; j <= num2; j++) {
            local_nextDays.push(j)
        }
        cal_obj.nextDays = local_nextDays;
        calendar = cal_obj;
    }

    setCalender(1);


    handleSelectDate = () => {
        let final_date = months[date.getMonth()] + ',' + date.getFullYear();
        if (props.eventMonth) {
            props.eventMonth(final_date);
        }

    }
    const showToolTip = (e, data, index) => {
        // console.log('data', data);
        let positonVar = props.options.tooltipPosition;

        if (data) {
            setToolTipDetails(data);
        }
        let elemParentRect = document.getElementById('rsce').getBoundingClientRect();
        let elemRect = e.target.getBoundingClientRect();

        setToolTip(true);
        let tooltipElem = document.getElementById('rsce-tooltip').getBoundingClientRect();
        /**
         * standard for absolute position
         * setTooltipLeft((elemRect.x - elemParentRect.x) - ((tooltipElem.width - elemRect.width) / 2))
         */
        if (positonVar === 'top' || positonVar === 'bottom' || positonVar === '' || positonVar === undefined) {

            if ((calendar.prevDays.length + index + 1) % 7 !== 0) {

                setTooltipLeft((elemRect.x) - ((tooltipElem.width - elemRect.width) / 2))
            }
            if ((calendar.prevDays.length + index + 1) % 7 === 0) {
                setTooltipLeft((elemRect.x) - ((tooltipElem.width - elemRect.width)))
            }

            if ((calendar.prevDays.length + index) % 7 === 0) {
                setTooltipLeft((elemRect.x))
            }
            if (positonVar === 'top' || positonVar === '' || positonVar === undefined) {
                setTooltipTop(elemRect.y - tooltipElem.height - 20)
            }
            if (positonVar === 'bottom') {
                setTooltipTop(elemRect.y + elemRect.height + 20)
            }
        }
        if (positonVar === 'left' || positonVar === 'right') {
            setTooltipTop(elemRect.y);
            if (elemRect.x < tooltipElem.width + 20) {
                setTooltipPositionClass('right');
                positonVar = 'right';
            }
            if ((calendar.prevDays.length + index + 1) % 7 === 0) {
                setTooltipPositionClass('left');
                positonVar = 'left';
            }

            if (positonVar === 'left') {
                setTooltipLeft(elemRect.x - tooltipElem.width - 20);
            }
            if (positonVar === 'right') {
                setTooltipLeft(elemRect.x + elemRect.width + 20);
            }

        }


    }
    const hideToolTIp = () => {
        setToolTip(false);
        setToolTipDetails({});
        setTooltipPositionClass(props.options.tooltipPosition);
    }
    const eventClick = (data) => {
        props.eventClick(data)
    }
    const empty_func = () => {
        //
    }

    return (
        <React.Fragment>
            <div className="dateEcContainer" id="rsce" >
                <div className="header">


                    <h1>
                        <button type="button" className="material-icons prev event-arrows" onClick={() => { setToDate('prev'); setCalender(); handleSelectDate(); setCount(count - 1) }}>keyboard_arrow_left</button>
                        {months[date.getMonth()]} {date.getFullYear()}
                        <button type="button" className="material-icons next event-arrows" onClick={() => { setToDate('next'); setCalender(); handleSelectDate(); setCount(count + 1) }}>keyboard_arrow_right</button>
                    </h1>

                </div>
                <div className="insideWrapper">
                    <div className="insideContainer">
                        <div className="weekdays">
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Sunday</strong></div>
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Monday</strong></div>
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Tuesday</strong></div>
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Wednesday</strong></div>
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Thursday</strong></div>
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Friday</strong></div>
                            <div style={{ fontSize: options.fontSize + 3 + 'px', lineHeight: (options.fontSize + 3) * 2 + 'px' }} className={` ${options.border ? 'bordered' : ''}`}><strong>Saturday</strong></div>
                        </div>
                        <div className="days">
                            {/* previous month's dates */}
                            {
                                calendar.prevDays.map(day => <div key={day} className={`prev_days ${options.border ? 'bordered' : ''} ${options.pattern ? options.pattern : ''}`}>
                                    {!options.presentOnly &&
                                        <span
                                            style={{ width: options.fontSize * 2 + 'px', height: options.fontSize * 2 + 'px', fontSize: options.fontSize, lineHeight: options.fontSize * 2 + 'px' }}
                                            className={`dayvalue 
                                    ${options.positionX ? options.positionX : ''} 
                                    ${options.positionY ? options.positionY : ''} 
                                    ${options.badge ? 'ec-badge-' + options.badge : ''} 
                                    `}>{day}</span>
                                    }
                                </div>)
                            }
                            {/* current month's dates */}
                            {
                                calendar.currentDays.map((day, i) =>
                                    <React.Fragment key={day}>


                                        <div
                                            onClick={() => {
                                                if (options.accessibility) {
                                                    setClickedDate(clicked_date = day);
                                                    setSelectedMonth(selectedMonth = date.getMonth());
                                                    setSelectedYear(selectedYear = date.getFullYear());
                                                }
                                            }}
                                            className={`
                                        ${day === new Date().getDate() &&
                                                    date.getMonth() === new Date().getMonth() &&
                                                    date.getFullYear() === new Date().getFullYear() ? "today" : ""
                                                } 
                                        ${day === clicked_date && selectedMonth === date.getMonth() && selectedYear === date.getFullYear() ? "selected_day" : ""}
                                        ${(Date.parse(`${date.getMonth()} ${day}, ${date.getFullYear()} `) > Date.parse(`${new Date().getMonth()} ${new Date().getDate()}, ${new Date().getFullYear()}`) || date.getFullYear() > new Date().getFullYear()) ? "coming_days" : ""}
                                        ${options.border ? 'bordered' : ''} 
                                        ${options.pattern ? options.pattern : ''} 
                                        ${events.map(e => { return e.day }).indexOf(day) > -1 && events[events.map(e => { return e.day }).indexOf(day)].day === day &&
                                                    propMonth === months[date.getMonth()] &&
                                                    Number(propYear) === date.getFullYear() ? 'hasEvent' : ''}
                                        `}>
                                            <span
                                                style={{ width: options.fontSize * 2 + 'px', height: options.fontSize * 2 + 'px', fontSize: options.fontSize, lineHeight: options.fontSize * 2 + 'px' }}
                                                className={`dayvalue 
                                    ${options.positionX ? options.positionX : ''} 
                                    ${options.positionY ? options.positionY : ''} 
                                    ${options.badge ? 'ec-badge-' + options.badge : ''} 
                                    
                                    `}>{day}</span>
                                            {events.length > 0 && events.map(e => { return e.day }).indexOf(day) > -1 &&
                                                <React.Fragment>
                                                    {events[events.map(e => { return e.day }).indexOf(day)].day === day &&
                                                        propMonth === months[date.getMonth()] &&
                                                        Number(propYear) === date.getFullYear() &&

                                                        <ul className={`events`} style={{ height: `calc(100% - ${(options.fontSize * 2) + 12 + 'px'})`, marginTop: (options.fontSize * 2) + 12 + 'px' }}>
                                                            {events[events.map(e => { return e.day }).indexOf(day)].events.map((et, ei) => {
                                                                return <li key={`event${day}${ei}`} style={{ fontSize: options.fontSize - 3 + 'px' }} onMouseOver={(e) => props.options.tooltip ? showToolTip(e, et, i) : empty_func()} onMouseOut={(e) => props.options.tooltip ? hideToolTIp() : empty_func()} onClick={() => props.eventClick ? eventClick(et) : empty_func()}>
                                                                    {et.title}
                                                                </li>
                                                            })}

                                                        </ul>
                                                    }
                                                </React.Fragment>
                                            }
                                        </div>
                                    </React.Fragment>

                                )
                            }
                            {/* next months days */}
                            {
                                calendar.nextDays.map(day => <div key={day} className={`next_days ${options.border ? 'bordered' : ''} ${options.pattern ? options.pattern : ''} `}>
                                    {!options.presentOnly &&
                                        <span
                                            style={{ width: options.fontSize * 2 + 'px', height: options.fontSize * 2 + 'px', fontSize: options.fontSize, lineHeight: options.fontSize * 2 + 'px' }}
                                            className={`dayvalue 
                                    ${options.positionX ? options.positionX : ''} 
                                    ${options.positionY ? options.positionY : ''} 
                                    ${options.badge ? 'ec-badge-' + options.badge : ''} 
                                    `}>{day}</span>
                                    }
                                </div>)
                            }


                        </div>
                        {props.options.tooltip &&
                            <div id="rsce-tooltip" className={`ec-tooltip ${tooltipPositionClass === '' || !tooltipPositionClass ? 'top' : tooltipPositionClass}`} style={{ top: tooltipTop + 'px', left: tooltipLeft + 'px', visibility: isToolTip ? 'visible' : 'hidden', zIndex: isToolTip ? 'unset' : '-1', opacity: isToolTip ? '1' : '0' }} >

                                {isToolTip &&
                                    <React.Fragment>
                                        {props.options.tooltipTitle && <h2>{tooltipDetails.title}</h2>}
                                        {tooltipDetails.details &&
                                            <React.Fragment>
                                                {Object.keys(tooltipDetails.details).map(function (key, i) {
                                                    return <p key={i}><span className="title">{key}:</span>&nbsp;&nbsp;{tooltipDetails.details[key]}</p>
                                                })
                                                }
                                            </React.Fragment>

                                        }

                                    </React.Fragment>
                                }

                            </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SingleCalendarEvents;