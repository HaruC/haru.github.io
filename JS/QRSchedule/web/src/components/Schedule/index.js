import React from "react"
import Tables from './Tables'
import {LinearProgress} from "material-ui/Progress"
import Error from "../Error/index"
import {get_week_array, b2i} from "../../utils/utils"


class Schedule extends React.Component{
    constructor(props){
    	 super(props)
	     this.handleGroup = this.handleGroup.bind(this)
         this.handleTeacher = this.handleTeacher.bind(this)
         this.handleSingle = this.handleSingle.bind(this)
    }

    state = {
        element: '',
        variable: ''
    }

    componentWillMount(){
        const { actions, match } = this.props
        const date = get_week_array()

        actions.loadScheduleRequest(match.params.id, date[date.length - 1])
    }

    handleGroup = (id) => {
		this.setState({
			variable: 'group',
			element: id
		})

        const {actions} = this.props
        const date = get_week_array()
        actions.loadGroupRequest(b2i(id), date[date.length - 1])
	}

	handleTeacher = (id) => {
		this.setState({
			variable: 'teacher',
			element: id
		})

        const {actions} = this.props
        const date = get_week_array()
        actions.loadTeacherRequest(b2i(id), date[date.length - 1])
	}

	handleSingle = (id) => {
		this.setState({
			variable: 'single',
			element: id
		})
	}

    render(){
        const { schedule: { loading, error } } = this.props

        if(loading){
            return <LinearProgress mode="indeterminate"/>
        }

        if(error){
            return <Error {...error} />
        }

        return (
            (this.props.schedule.data)
                ? (
                    <Tables
                        handleTeacher={this.handleTeacher}
                        handleGroup={this.handleGroup}
                        handleSingle={this.handleSingle}
                        variable={this.state.variable}
                        element={this.state.element}
                        {...this.props}
                    />
                )
                : ("")
        )
    }
}

export default Schedule