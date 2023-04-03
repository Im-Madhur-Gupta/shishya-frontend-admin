import React from 'react'
import CustomInput from '../CustomInput'
import useFormStore from '../../store/formStore'

import styles from '../../styles/Pages/CreateFormStep1.module.css'

const academicYearData = [
	{
		value: 2020,
		name: '2020/24',
	},
	{
		value: 2021,
		name: '2021/25',
	},
	{
		value: 2022,
		name: '2022/26',
	},
	{
		value: 2023,
		name: '2023/27',
	},
]

const FormDetails = () => {
	const {
		onTitleChange,
		onAcademicYearChange,
		onDeadlineChange,
		onDescriptionChange,
	} = useFormStore((state) => ({
		onTitleChange: state.onTitleChange,
		onAcademicYearChange: state.onAcademicYearChange,
		onDeadlineChange: state.onDeadlineChange,
		onDescriptionChange: state.onDescriptionChange,
	}))

	return (
		<div className={styles.create__form__body}>
			<div className={styles.form__element}>
				<div className={styles.form__input__wrapper}>
					<CustomInput
						data={undefined}
						label={'Form Title'}
						placeholder={'Enter the Title'}
						type={'text'}
						onChange={(e) => onTitleChange(e.target.value)}
					/>
				</div>
				<div className={styles.form__input__wrapper}>
					<CustomInput
						data={academicYearData}
						label={'Academic Year'}
						placeholder={'Select'}
						type={'drop-down'}
						onChange={(e) => onAcademicYearChange(e)}
					/>
				</div>
				<div className={styles.form__input__wrapper}>
					<CustomInput
						data={undefined}
						label={'Deadline'}
						placeholder={'Select a date'}
						type={'date'}
						onChange={(e) => onDeadlineChange(e._d)}
					/>
				</div>
				<div className={styles.form__input__wrapper}>
					<CustomInput
						data={undefined}
						label={'Description'}
						placeholder={'Write your instructions here'}
						type={'textarea'}
						onChange={(e) => onDescriptionChange(e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default FormDetails
