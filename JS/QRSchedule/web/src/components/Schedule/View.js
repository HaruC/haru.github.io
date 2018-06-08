import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import Person from 'material-ui-icons/Person'
import Group from 'material-ui-icons/Group'
import Place from 'material-ui-icons/Place'
import TurnedIn from 'material-ui-icons/TurnedIn'
import Schedule from 'material-ui-icons/Schedule'
import Divider from 'material-ui/Divider'


export const Single = (props) => (
	<div key={props.element.node.id}>
		{
			<div>
				<div className={props.classes.head}>
					<h1 className={props.classes.header}>
						{
							(props.element.node.wplanSubkurs)
								? (props.element.node.wplanSubkurs.subkursType.name)
								: (props.element.node.wplanKurs.kursType)
									? props.element.node.wplanKurs.kursType.name
									: (props.element.node.wplanKurs.disciplineType)
										? props.element.node.wplanKurs.disciplineType.name
										: ''
						}
					</h1>
					<p className={props.classes.sub}>
						{props.element.node.lessonType.name}
					</p>
				</div>
				<Divider/>
				<div className={props.classes.element}>
					<Schedule className={props.classes.icon} />
					<p className={props.classes.block}>
						<a style={{ color : '#000000' }}>
						{props.element.node.studyTime.timeStart.slice(0, 5)}
							&nbsp;-&nbsp;
						{props.element.node.studyTime.timeEnd.slice(0, 5)}
						</a>
						<br/>
						{props.element.node.dayType.sname},&nbsp;
						{moment(
							props.num_week[props.week.indexOf(props.element.node.dayType.sname)]
						).format("DD.MM.YYYY")}
					</p>
				</div>
				<div></div>
				<div className={props.classes.element} style={{marginBottom: 3}}>
					<Place className={props.classes.icon} />
					<p className={props.classes.block}>
						<a style={{ color: "#000000"}}>
							{props.element.node.rooms.corpusType.address}&nbsp;корп.
							{props.element.node.rooms.corpusType.number}&nbsp;эт.
							{props.element.node.rooms.floor}&nbsp;ауд.
							{props.element.node.rooms.number}&nbsp;
							{
								(props.element.node.rooms.numberAdd)
									? props.element.node.rooms.numberAdd
									: ''
							}
						</a>
					</p>
				</div>
				<Divider/>
				<div className={classNames(props.classes.element, props.classes.action)} onClick={() => props.handleTeacher(props.element.node.personnel.teachers.id)}>
					<Person className={props.classes.icon} />
					<p className={props.classes.block}>
						<a style={{ color: '#000000' }}>
							{props.element.node.personnel.teachers.fio}
							</a>
						<br/>
						{
							(props.element.node.personnel.teachers.duty) ? (
								props.element.node.personnel.teachers.duty.name
							) : ('')
						}
					</p>
				</div>
				<div></div>
				<div className={classNames(props.classes.element, props.classes.action)} onClick={() => props.handleGroup(props.element.node.group.id)}>
					<Group className={props.classes.icon} />
					<p className={props.classes.block}>
						<a style={{ color: "#000000"}}>
							{props.element.node.group.fullName}
						</a>
					</p>
				</div>
			</div>
		}
	</div>
)

export const Week = (props) => (
	<div onClick={() => props.switch(props.element.node.id)} className={props.classes.action}>
		{
			(
				(props.element.node.studyTime.timeStart <= props.now &&
					props.now <= props.element.node.studyTime.timeEnd
				) && moment().format("YYYY-MM-DD") === props.day)
				? (<TurnedIn className={props.classes.bookmark}/>)
				: ('')
		}
		<div>
			<p className={props.classes.time}>
				{props.element.node.studyTime.timeStart.slice(0, 5)}
			</p>
			<h1 className={props.classes.text}>
				{
					(props.element.node.wplanSubkurs)
						? (props.element.node.wplanSubkurs.subkursType.name)
						: (props.element.node.wplanKurs.kursType)
						? props.element.node.wplanKurs.kursType.name
						: (props.element.node.wplanKurs.disciplineType)
							? props.element.node.wplanKurs.disciplineType.name
							: ''
				}
				&nbsp;
				{
					(props.element.node.subgroup === 0)
						? ("")
						: (props.element.node.subgroup === 1)
							? ("( 1 )")
							: ("( 2 )")
				}
			</h1>
			<p className={props.classes.text}>
				{props.element.node.lessonType.name}
			</p>
			<p className={props.classes.text}>
				{props.element.node.personnel.teachers.fio}
			</p>
		</div>
		<Divider/>
	</div>
)
