from sqlalchemy import Column, Date, Float, ForeignKey, Integer, \
    SmallInteger, String, Text, Time, text
from sqlalchemy.orm import relationship, foreign
from database import Base


class BlockType(Base):
    """
        Таблица учебных модулей.
    """
    __tablename__ = 'block_type'

    id = Column(Integer, primary_key=True)
    name = Column(String(82), nullable=False, index=True, doc="Название учебного блока.<br> Пример: ``Факультативы``.")


class ControlTypeName(Base):
    """
        Таблица форм контроля предмета.
    """
    __tablename__ = 'control_type_name'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), doc="Форма контроля предмета.<br> Пример: ``устный``.")
    code = Column(Text(1), doc="Сокращённая форма контроля предмета.<br> Пример: ``у``.")
    name_for_schedule = Column(String(50), doc="Форма контроля для расписания<br> Пример: ``в устной форме``.")


class CorpusType(Base):
    """
        Таблица корпусов университета.
    """
    __tablename__ = 'corpus_type'

    id = Column(SmallInteger, primary_key=True)
    number = Column(String(10), nullable=False, doc="Номер корпуса.<br> Пример: ``1``.")
    address = Column(String(100), doc="Адрес корпуса.<br> Пример: ``Мойка 48``.")


class DayType(Base):
    """
        Таблица дней недели.
    """
    __tablename__ = 'day_type'

    id = Column(SmallInteger, primary_key=True)
    name = Column(String(11), nullable=False, doc="День недели.<br> Пример: ``понедельник``.")
    sname = Column(Text(2), nullable=False, doc="Сокращение дня недели.<br> Пример: ``Пн``.")


class DisciplineType(Base):
    """
        Таблица типов дисциплин.
    """
    __tablename__ = 'discipline_type'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False, unique=True, doc="Тип дисциплины. <br> Пример: ``Алгебра``.")
    s_name = Column(String(60), doc="Сокращённое название типа дисциплины (для очень длинных).<br> Пример: ``Алгебра``.")


class Duty(Base):
    """
        Таблица должностей преподавателей.
    """
    __tablename__ = 'duty'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False, doc="Должность преподавателя.<br> Пример: ``доцент``.")
    s_name = Column(String(9), doc="Сокращённая запись должность преподавателя.<br> Пример: ``доц.``.")


class GroupSh(Base):
    """
        Таблица обучающихся групп.
    """
    __tablename__ = 'group_sh'

    id = Column(Integer, primary_key=True)
    name = Column(String(10), nullable=False, index=True, doc="Сокращённое название группы.<br> Пример: ``1 ПО``.")
    full_name = Column(String(17), doc="Название группы.<br> Пример: ``1 ПО/12``.")


class KursType(Base):
    """
        Таблица возможных курсов.
    """
    __tablename__ = 'kurs_type'

    id = Column(Integer, primary_key=True)
    id_discipline = Column(ForeignKey('discipline_type.id'), nullable=False, doc="ID_DisciplineType -> DisciplineType.ID")
    name = Column(String(250), nullable=False, doc="Название курса.<br> Пример: ``История Англии``.")

    discipline_type = relationship('DisciplineType')


class LessonType(Base):
    """
        Таблица типов занятий.
    """
    __tablename__ = 'lesson_type'

    id = Column(SmallInteger, primary_key=True)
    name = Column(String(30), nullable=False, doc="Тип занятия.<br> Пример: ``лекция``.")
    sname = Column(String(5), doc="Сокращение типа занятия.<br> Пример: ``лекц``.")


class Personnel(Base):
    """
        Таблица персоналий университета.
    """
    __tablename__ = 'personnel'

    id = Column(Integer, primary_key=True)
    id_teacher = Column(ForeignKey('teachers.id'), nullable=False, doc="ID_Teachers -> Teachers.ID")

    teachers = relationship('Teachers')


class Rooms(Base):
    """
        Таблица аудиторий университета.
    """
    __tablename__ = 'rooms'

    id = Column(Integer, primary_key=True)
    id_corpus = Column(ForeignKey('corpus_type.id'), doc="IDCorpus -> CorpusType.ID")
    floor = Column(SmallInteger, doc="Этаж.")
    number = Column(SmallInteger, nullable=False, doc="Номер аудитории.<br> Пример: ``331``.")
    number_add = Column(String(5), doc="Дополнительный номер аудитории (если существует).<br> Пример: ``a``.")

    corpus_type = relationship('CorpusType')


class StudyTime(Base):
    """
        Таблица времени начала занятий расписания.
    """
    __tablename__ = 'study_time'

    id = Column(Integer, primary_key=True)
    time_start = Column(Time, index=True, doc="Время начала занятия.<br> Пример: ``13:30``.")
    time_end = Column(Time, index=True, doc="Время окончания занятия.<br> Пример: `13:30`.")
    time_length = Column(SmallInteger, server_default=text("2"), doc="Продолжительность занятия (академических часов).<br> Пример: ``2``.")


class Schedule(Base):
    """
        Таблица повседневного расписания и зачётов.
    """
    __tablename__ = 'shedule'

    id = Column(Integer, primary_key=True)
    id_rooms = Column(ForeignKey('rooms.id'), doc="ID_Rooms -> Rooms.ID")
    id_day_type = Column(ForeignKey('day_type.id'), doc="ID_DayType -> DayType.ID")
    id_study_time = Column(ForeignKey('study_time.id'), doc="ID_StudyTime -> StudyTime.ID")
    id_week_type = Column(ForeignKey('week_type.id'), doc="ID_WeekType -> WeekType.ID")
    id_group_type = Column(ForeignKey('group_sh.id'), doc="ID_GroupType -> GroupType.ID")
    id_wplan_kurs = Column(ForeignKey('wplan_kurs.id'), doc="ID_WplanKurs -> WplanKurs.ID")
    id_personnel = Column(ForeignKey('personnel.id'), doc="ID_Personnel -> Personnel.ID")
    id_lesson_type = Column(ForeignKey('lesson_type.id'), doc="ID_LessonType -> LessonType.ID")
    id_control_type_name = Column(ForeignKey('control_type_name.id'), doc="ID_ControlTypeName -> ControlTypeName.ID")
    id_wplan_subkurs = Column(ForeignKey('wplan_subkurs.id'), doc="ID_WplanSubkurs -> WplanSubkurs.ID")
    semestr = Column(SmallInteger, index=True, doc="Семестр.<br> Пример: ``0``.")
    subgroup = Column(SmallInteger, doc="Подгруппа (0 - все/1/2).<br> Пример: ``0``.")
    group_fraction = Column(Float, server_default=text("1"))
    note = Column(String(1000), doc="Заметка. <br> Пример: ``с 10.09 по 11.10``.")
    sem_beg = Column(Date, index=True, doc="Дата начала первого занятия. <br> Пример: ``2018-02-02``.")
    sem_end = Column(Date, index=True, doc="Дата окончания последнего занятия.<br> Пример: ``2018-02-02``.")
    time_start = Column(Time, doc="Время начала занятия (для зачётов и других специальных занятий).<br> Пример: ``11:35``.")
    time_end = Column(Time, doc="Время окончания занятия (для зачётов и других специальных занятий).<br> Пример: ``11:35``.")

    time_join = relationship('StudyTime',
        primaryjoin=(id_study_time == foreign(StudyTime.id)), uselist=True
    )
    rooms = relationship('Rooms')
    group = relationship('GroupSh')
    control_type_name = relationship('ControlTypeName')
    day_type = relationship('DayType')
    lesson_type = relationship('LessonType')
    personnel = relationship('Personnel')
    study_time = relationship('StudyTime')
    week_type = relationship('WeekType')
    wplan_kurs = relationship('WplanKurs')
    wplan_subkurs = relationship('WplanSubkurs')


class ScheduleExam(Base):
    """
        Таблица расписаний экзаменов, консультаций и не экзаменов.
    """
    __tablename__ = 'schedule_exams'

    id = Column(Integer, primary_key=True)
    id_wplan_kurs = Column(ForeignKey('wplan_kurs.id'), nullable=False, doc="ID_WplanKurs -> WplanKurs.ID")
    id_wplan_subkurs = Column(ForeignKey('wplan_subkurs.id'), doc="ID_WplanSubkurs -> WplanSubkurs.ID")
    id_group_type = Column(ForeignKey('group_sh.id'), nullable=False, doc="ID_GroupType -> GroupType.ID")
    id_personnel = Column(ForeignKey('personnel.id'), doc="ID_Personnel -> Personnel.ID")
    id_room = Column(ForeignKey('rooms.id'), doc="ID_Room -> Room.ID")
    is_exam = Column(SmallInteger, server_default=text("1"), doc="Является ли запись экзаменом. 0 - консультация, 1 - экзамен.")
    date_exam = Column(Date, nullable=False, index=True, doc="Дата экзамена.<br> Пример: ``2018-02-02``.")
    time_exam = Column(Time, index=True, doc="Время начала экзамена.<br> Пример: ``10:00``.")
    time_end = Column(Time, doc="Время окончания экзамена.<br> Пример: ``11:00``.")
    note = Column(String(100), doc="Заметка.")

    rooms = relationship('Rooms')
    group_sh = relationship('GroupSh')
    personnel = relationship('Personnel')
    wplan_kurs = relationship('WplanKurs')
    wplan_subkurs = relationship('WplanSubkurs')


class ScheduleGosexam(Base):
    """
        Таблица государственных экзаменов.
    """
    __tablename__ = 'schedule_gosexams'

    id = Column(Integer, primary_key=True)
    id_wplan_gosexam = Column(ForeignKey('wplan_gosexam.id'), nullable=False, doc="ID_WplanGosExam -> WplanGosExam.ID")
    id_group_type = Column(ForeignKey('group_sh.id'), nullable=False, doc="ID_GroupType -> GroupType.ID")
    id_room = Column(ForeignKey('rooms.id'), doc="ID_Room -> Room.ID")
    id_personnel = Column(ForeignKey('personnel.id'), doc="ID_Personnel -> Personnel.ID")
    date_exam = Column(Date, nullable=False, index=True, doc="Дата экзамена.<br> Пример: ``2018-02-02``.")
    time_exam = Column(Time, doc="Время начала экзамена.<br> Пример: ``13:30``.")
    time_end = Column(Time, doc="Время окончания экзамена.<br> Пример: ``13:30``.")
    is_exam = Column(SmallInteger, server_default=text("1"), doc="0 - консультация, 1 - экзамен, 2 - защита ВКР.")
    note = Column(String(100), doc="Заметка.")

    group_sh = relationship('GroupSh')
    personnel = relationship('Personnel')
    rooms = relationship('Rooms')
    wplan_gosexam = relationship('WplanGosexam')


class SubkursType(Base):
    """
        Таблица учебных предметов.
    """
    __tablename__ = 'subkurs_type'

    id = Column(Integer, primary_key=True)
    id_kurs_type = Column(ForeignKey('kurs_type.id'), doc="ID_KursType -> KursType.ID")
    id_discipline_type = Column(ForeignKey('discipline_type.id'), doc="ID_DisciplineType -> DisciplineType.ID")
    id_personnel = Column(ForeignKey('personnel.id'), doc="ID_Personnel -> Personnel.ID")
    name = Column(String(250), index=True, doc="Название предмета.<br> Пример: ``Программирование``.")

    discipline_type = relationship('DisciplineType')
    kurs_type = relationship('KursType')
    personnel = relationship('Personnel')


class Teachers(Base):
    """
        Таблица преподавателей.
    """
    __tablename__ = 'teachers'

    id = Column(Integer, primary_key=True)
    id_duty = Column(ForeignKey('duty.id'), doc="ID_Duty -> Duty.ID")
    fio = Column(String(100), nullable=False, index=True, doc="ФИО.<br> Пример: ``Иванов Иван Иванович``.")
    s_fio = Column(String(40), doc="Сокращённая запись ФИО.<br> Пример: ``Иванов И.И.``.")

    duty = relationship('Duty')


class WeekType(Base):
    """
        Таблица типов недель.
    """
    __tablename__ = 'week_type'

    id = Column(SmallInteger, primary_key=True)
    name = Column(String(7), nullable=False, doc="Тип недели.<br> Пример: ``верхняя`` или ``нижняя``.")
    sname = Column(Text(1), nullable=False, doc="Сокращение типа недели.<br> Пример: ``в`` или ``н``.")


class WplanGosexam(Base):
    __tablename__ = 'wplan_gosexam'

    id = Column(Integer, primary_key=True)
    semestr = Column(SmallInteger, doc="Семестр.")
    date_beg = Column(Date, doc="Дата начала.")
    date_end = Column(Date, doc="Дата окончания.")


class WplanKurs(Base):
    __tablename__ = 'wplan_kurs'

    id = Column(Integer, primary_key=True)
    id_block_type = Column(ForeignKey('block_type.id'), doc="ID_BlockType -> BlockType.ID")
    id_discipline_type = Column(ForeignKey('discipline_type.id'), doc="ID_DisciplineType -> DisciplineType.ID")
    id_kurs_type = Column(ForeignKey('kurs_type.id'), doc="ID_KursType -> KursType.ID")

    block_type = relationship('BlockType')
    discipline_type = relationship('DisciplineType')
    kurs_type = relationship('KursType')


class WplanSubkurs(Base):
    __tablename__ = 'wplan_subkurs'

    id = Column(Integer, primary_key=True)
    id_wplan_kurs = Column(ForeignKey('wplan_kurs.id'), nullable=False, doc="ID_WplanKurs -> WplanKurs.ID")
    id_subkurs_type = Column(ForeignKey('subkurs_type.id'), nullable=False, doc="ID_SubkursType -> SubkursType.ID")

    subkurs_type = relationship('SubkursType')
    wplan_kurs = relationship('WplanKurs')
