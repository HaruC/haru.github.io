import {createApolloFetch} from 'apollo-fetch'
import download from 'downloadjs'
import { url_prefix } from "./utils"

const uri = url_prefix +'/graphql'

const apolloFetch = createApolloFetch({uri})

const loadUuidData = () => {
	return fetch(url_prefix +'/uuid')
		.then(res => res.json())
		.then(data => ({data}))
		.catch(error => ({error}))
		;
};

const createUuidData = (id) => {
	return fetch(url_prefix +"/uuid",
		{
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"id": id})
		})
		.then(res => res.json())
		.then(data => ({data}))
		.catch(error => ({error}))
};

const loadPdf = (uuid) => {
	return fetch(url_prefix +"/code/" + uuid + ".pdf",
		{
			method: "GET"
		})
		.then(res => res.blob())
		.then(blob => download(blob))
		.catch(error => ({error}))
};

const loadFacilityData = () => {
	const query = `
	   query Facility{
			corpusType{
				edges{
				  node{
				    id
				    number
				  }
				}
			}
		}
   `

	return apolloFetch({query})
		.then(data => ({data}))
		.catch(error => ({error}))
		;

};

const loadRoomsData = (id, day, now) => {
	const query = `
    query Look($ID: Int!, $day: Date!, $time: Time!){
      rooms(id: $ID){
        edges{
          node{
            id
            number
            numberAdd
            corpusType{
              id
              number
            }
          }
        }
      }
      test(day: $day, now: $time, facility: $ID){
        edges{
          node{
            id
            semBeg
            semEnd
            rooms{
              id
              number
            }
            dayType{
              sname
            }
            weekType{
              name
            }
          }
        }
      }
    }
  `
	const variables = {
		ID: id,
		day: day,
		time: now
	}

	return apolloFetch({query, variables})
		.then(data => ({data}))
		.catch(error => ({error}))
		;
};

const loadTeacherData = (id, date) => {
	const query = `
	query TeacherSchedule($TeacherID: Int!, $Day: Date!){
	  filterTeacher(day: $Day, teacher: $TeacherID){
		edges{
		  node{
			id
			semBeg
			semEnd
			timeStart
			timeEnd
			subgroup
			studyTime{
			  timeStart
			  timeEnd
			}
			dayType{
			  name
			  sname
			}
			weekType{
			  name
			  sname
			}
			rooms{
			  id
			  number
			  numberAdd
			  floor
			  corpusType{
				id
				number
				address
			  }
			}
			group{
			  id
			  name
			  fullName
			}
			lessonType{
			  name
			  sname
			}
			personnel{
			  teachers{
				id
				fio
				sFio
				duty{
				  name
				}
			  }
			}
			wplanKurs{
			  disciplineType{
				name
				sName
			  }
			  kursType{
				name
			  }
			}
			wplanSubkurs{
			  subkursType{
				name
				kursType{
				  name
				  disciplineType{
					name
				  }
				}
			  }
			}
		  }
		}
	  }
	}
  `
	const variables = {
		TeacherID: id,
		Day: date
	}

	return apolloFetch({query, variables})
		.then(data => ({data}))
		.catch(error => ({error}))
		;
};

const loadGroupData = (id, date) => {
	const query = `
	query GroupSchedule($GroupID: Int!, $Day: Date!){
	  filterGroup(day: $Day, group: $GroupID){
		edges{
		  node{
			id
			subgroup
			dayType{
			  id
			  sname
			}
			rooms{
			  id
			  number
			  numberAdd
			  floor
			  corpusType{
				id
				number
				address
			  }
			}
			lessonType{
			  id
			  name
			}
			group{
			  id
			  fullName
			}
			personnel{
			  id
			  teachers{
				id
				fio
			  }
			}
			studyTime{
			  id
			  timeStart
			  timeEnd
			}
			weekType{
			  id
			  name
			}
			wplanKurs{
			  id
			  blockType{
				id
				name
			  }
			  kursType{
				id
				name
			  }
			  disciplineType{
				id
				name
			  }
			}
			wplanSubkurs{
			  subkursType{
				name
				kursType{
				  name
				  disciplineType{
					name
				  }
				}
			  }
			}
		  }
		}
	  }
	}
  `
	const variables = {
		GroupID: id,
		Day: date
	}

	return apolloFetch({query, variables})
		.then(data => ({data}))
		.catch(error => ({error}))
		;
};

const loadScheduleData = (id, date) => {
	const query = `
    query Search($id: Int!, $date: Date!) {
      schedule(room: $id, day: $date){
        edges{
          node{
            id
            semBeg
            semEnd
            timeStart
            timeEnd
            subgroup
            studyTime{
              timeStart
              timeEnd
            }
            dayType{
              name
              sname
            }
            weekType{
              name
              sname
            }
            rooms{
              id
              number
              numberAdd
              floor
              corpusType{
                id
                number
                address
              }
            }
            group{
              id
              name
              fullName
            }
            lessonType{
              name
              sname
            }
            personnel{
              teachers{
              	id
                fio
                duty{
                  name
                }
              }
            }
            wplanKurs{
              disciplineType{
                name
                sName
              }
              kursType{
                name
              }
            }
            wplanSubkurs{
              subkursType{
                name
                kursType{
                  name
                  disciplineType{
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `
	const variables = {
		id: id,
		date: date
	}

	return apolloFetch({query, variables})
		.then(data => ({data}))
		.catch(error => ({error}))
};

export {loadUuidData, loadRoomsData, loadFacilityData, loadScheduleData, createUuidData, loadPdf, loadGroupData, loadTeacherData}