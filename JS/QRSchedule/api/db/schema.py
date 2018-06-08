from datetime import timedelta
from graphene import *
from graphene import relay
from graphene.types.datetime import Date, Time
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from sqlalchemy.sql import and_, or_
from sqlalchemy.sql.expression import between
from models import WplanGosexam as WplangosexamModel
from models import ScheduleExam as SchedulexamModel
from models import ScheduleGosexam as SchedulegosexamModel
from models import Schedule as ScheduleModel
from models import Teachers as TeachersModel
from models import Personnel as PersonnelModel
from models import GroupSh as GroupshModel
from models import BlockType as BlocktypeModel
from models import DisciplineType as DisciplinetypeModel
from models import WplanSubkurs as WplansubkursModel
from models import WplanKurs as WplankursModel
from models import SubkursType as SubkurstypeModel
from models import KursType as KurstypeModel
from models import Duty as DutyModel
from models import Rooms as RoomsModel
from models import CorpusType as CorpustypeModel
from models import StudyTime as StudytimeModel
from models import DayType as DaytypeModel
from models import WeekType as WeektypeModel
from models import LessonType as LessontypeModel
from models import ControlTypeName as ControltypenameModel


class BlockType(SQLAlchemyObjectType):
    """
        Таблица учебных модулей.
    """
    class Meta:
        model = BlocktypeModel
        interfaces = (relay.Node, )


class ControlType(SQLAlchemyObjectType):
    """
        Таблица форм контроля предмета.
    """
    class Meta:
        model = ControltypenameModel
        interfaces = (relay.Node, )


class CorpusType(SQLAlchemyObjectType):
    """
        Таблица корпусов университета.
    """
    class Meta:
        model = CorpustypeModel
        interfaces = (relay.Node, )


class DayType(SQLAlchemyObjectType):
    """
        Таблица дней недели.
    """
    class Meta:
        model = DaytypeModel
        interfaces = (relay.Node, )


class DisciplineType(SQLAlchemyObjectType):
    """
        Таблица типов дисциплин.
    """
    class Meta:
        model = DisciplinetypeModel
        interfaces = (relay.Node, )


class Duty(SQLAlchemyObjectType):
    """
        Таблица должностей преподавателей.
    """
    class Meta:
        model = DutyModel
        interfaces = (relay.Node, )


class Exams(SQLAlchemyObjectType):
    """
        Таблица расписаний экзаменов, консультаций и не экзаменов.
    """
    class Meta:
        model = SchedulexamModel
        exclude_fields = ('id_wplan_kurs', 'id_wplan_subkurs', 'id_group_type',
                          'id_personnel', 'id_room',)
        interfaces = (relay.Node, )


class GroupSh(SQLAlchemyObjectType):
    """
        Таблица обучающихся групп.
    """
    class Meta:
        model = GroupshModel
        interfaces = (relay.Node, )


class Gosses(SQLAlchemyObjectType):
    """
        Таблица государственных экзаменов.
    """
    class Meta:
        model = SchedulegosexamModel
        exclude_fields = ('id_wplan_gosexam', 'id_group_type', 'id_room', 'id_personnel',)
        interfaces = (relay.Node, )


class KursType(SQLAlchemyObjectType):
    """
        Таблица возможных курсов.
    """
    class Meta:
        model = KurstypeModel
        exclude_fields = ('id_discipline',)
        interfaces = (relay.Node, )


class LessonType(SQLAlchemyObjectType):
    """
        Таблица типов предмета.
    """
    class Meta:
        model = LessontypeModel
        interfaces = (relay.Node, )


class Schedule(SQLAlchemyObjectType):
    """
        Таблица повседневного расписания и зачётов.
    """
    class Meta:
        model = ScheduleModel
        exclude_fields = ('id_rooms', 'id_day_type', 'id_study_time',
                          'id_week_type', 'id_group_type', 'id_wplan_kurs',
                          'id_personnel', 'id_lesson_type', 'id_control_type_name',
                          'id_wplan_subkurs',)
        interfaces = (relay.Node, )


class StudyTime(SQLAlchemyObjectType):
    """
        Таблица времени начала занятий расписания.
    """
    class Meta:
        model = StudytimeModel
        interfaces = (relay.Node, )


class SubkursType(SQLAlchemyObjectType):

    class Meta:
        model = SubkurstypeModel
        exclude_fields = ('id_kurs_type', 'id_discipline_type', 'id_personnel',)
        interfaces = (relay.Node, )


class Personnel(SQLAlchemyObjectType):
    """
        Таблица персоналий университета.
    """
    class Meta:
        model = PersonnelModel
        exclude_fields = ('id_teacher',)
        interfaces = (relay.Node, )


class Rooms(SQLAlchemyObjectType):
    """
        Таблица аудиторий университета.
    """
    class Meta:
        model = RoomsModel
        exclude_fields = ('',)
        interfaces = (relay.Node, )


class Teachers(SQLAlchemyObjectType):
    """
        Таблица преподавателей.
    """
    class Meta:
        model = TeachersModel
        exclude_fields = ('id_duty',)
        interfaces = (relay.Node, )


class WeekType(SQLAlchemyObjectType):
    """
        Таблица типов недель.
    """
    class Meta:
        model = WeektypeModel
        interfaces = (relay.Node, )


class Wplangosexam(SQLAlchemyObjectType):

    class Meta:
        model = WplangosexamModel
        interfaces = (relay.Node, )


class WplanKurs(SQLAlchemyObjectType):

    class Meta:
        model = WplankursModel
        exclude_fields = ('id_block_type','id_discipline_type','id_kurs_type',)
        interfaces = (relay.Node, )


class WplanSubkurs(SQLAlchemyObjectType):

    class Meta:
        model = WplansubkursModel
        exclude_fields = ('id_wplan_kurs','id_subkurs_type',)
        interfaces = (relay.Node, )


class Query(ObjectType):
    schedule = SQLAlchemyConnectionField(
        Schedule,
        room=Int(required=True), day=Date(required=True),
        description="Поиск расписания занятий и зачётов по аудитории."
    )

    filter_group = SQLAlchemyConnectionField(
        Schedule,
        group=Int(required=True), day=Date(required=True),
        description="Фильтр по группам."
    )

    filter_teacher = SQLAlchemyConnectionField(
        Schedule,
        teacher=Int(required=True), day=Date(required=True),
        description="Фильтр по учителям."
    )

    exams = SQLAlchemyConnectionField(
        Exams,
        room=Int(required=False), day=Date(required=False), range=Date(required=False),
        description="Поиск расписания экзаменов и консультаций по аудитории."
    )

    gosses = SQLAlchemyConnectionField(
        Gosses,
        room=Int(required=False), day=Date(required=False), range=Date(required=False),
        description="Поиск расписания государственных экзаменов по аудитории."
    )

    test = SQLAlchemyConnectionField(
        Schedule,
        day=Date(required=True), now=Time(required=True), facility=Int(required=True),
        description="Список активных занятий в определенное время."
    )

    rooms = SQLAlchemyConnectionField(
        Rooms,
        id=Int(required=False),
        description="Поиск аудиторий(id)."
    )

    node = relay.Node.Field()
    study_time = relay.node.Field(StudyTime, description="")
    week_day = SQLAlchemyConnectionField(WeekType, description="")
    lesson_type = SQLAlchemyConnectionField(LessonType, description="")
    day_type = SQLAlchemyConnectionField(DayType, description="")
    person = SQLAlchemyConnectionField(Personnel, description="")
    kurs_type = SQLAlchemyConnectionField(KursType, description="")
    wplan_kurs = SQLAlchemyConnectionField(WplanKurs, description="")
    block_type = SQLAlchemyConnectionField(BlockType, description="")
    teachers = SQLAlchemyConnectionField(Teachers, description="")
    corpus_type = SQLAlchemyConnectionField(CorpusType, description="")
    group = SQLAlchemyConnectionField(GroupSh, description="")
    wplangos = SQLAlchemyConnectionField(Wplangosexam, description="")

    def resolve_test(self, info, **args):
        day = args.get("day")
        facility = args.get("facility")
        now = args.get("now")

        res = Schedule.get_query(info).\
            join(StudytimeModel).\
            join(RoomsModel, CorpustypeModel).\
            filter(CorpustypeModel.id == facility).\
            filter(
                between(day, ScheduleModel.sem_beg, ScheduleModel.sem_end)
            ).\
            filter(
                between(now, StudytimeModel.time_start, StudytimeModel.time_end)
            ).\
            all()

        return res

    def resolve_rooms(self, info, **args):
        id = args.get("id")
        res = Rooms.get_query(info)

        if id:
            res = Rooms.get_query(info).\
                join(CorpustypeModel).\
                filter(CorpustypeModel.id == id)

        return res.all()

    def resolve_schedule(self, info, **args):
        room = args.get("room")
        last_day = args.get("day")

        first_day = last_day - timedelta(days=6)

        res = Schedule.get_query(info).\
            filter(ScheduleModel.id_rooms == room).\
            filter(
                or_(
                    between(last_day, ScheduleModel.sem_beg, ScheduleModel.sem_end),
                    between(first_day, ScheduleModel.sem_beg, ScheduleModel.sem_end),
                    between(ScheduleModel.sem_beg, first_day, last_day),
                    between(ScheduleModel.sem_end, first_day, last_day)
                )
            ).all()

        return res

    def resolve_filter_group(self, info, **args):
        last_day = args.get("day")
        group = args.get("group")

        first_day = last_day - timedelta(days=6)

        res = Schedule.get_query(info).\
            join(GroupshModel).\
            filter(GroupshModel.id == group).\
            filter(
                or_(
                    between(last_day, ScheduleModel.sem_beg, ScheduleModel.sem_end),
                    between(first_day, ScheduleModel.sem_beg, ScheduleModel.sem_end),
                    between(ScheduleModel.sem_beg, first_day, last_day),
                    between(ScheduleModel.sem_end, first_day, last_day)
                )
            ).all()

        return res

    def resolve_filter_teacher(self, info, **args):
        last_day = args.get("day")
        teacher = args.get("teacher")

        first_day = last_day - timedelta(days=6)

        res = Schedule.get_query(info).\
            join(PersonnelModel).\
            join(TeachersModel).\
            filter(TeachersModel.id == teacher).\
            filter(
                or_(
                    between(last_day, ScheduleModel.sem_beg, ScheduleModel.sem_end),
                    between(first_day, ScheduleModel.sem_beg, ScheduleModel.sem_end),
                    between(ScheduleModel.sem_beg, first_day, last_day),
                    between(ScheduleModel.sem_end, first_day, last_day)
                )
            ).all()

        return res

    def resolve_exams(self, info, **args):
        room = args.get("room")
        today = args.get("day")
        res = Exams.get_query(info).\
            filter(SchedulexamModel.id_room == room). \
            filter(SchedulexamModel.date_exam == today)
        return res.all()

    def resolve_gosses(self, info, **args):
        room = args.get("room")
        today = args.get("sdate")
        res = Gosses.get_query(info).\
            filter(SchedulegosexamModel.id_room == room). \
            filter(SchedulegosexamModel.date_exam == today)
        return res.all()


schema = Schema(query=Query, types=[Schedule, Teachers, StudyTime,
                                    WeekType, LessonType, DayType,
                                    Personnel, BlockType, CorpusType,
                                    Rooms, WplanKurs, KursType,
                                    Gosses, Exams, Wplangosexam])
