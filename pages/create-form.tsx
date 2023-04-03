import React from 'react'

import useFormStore from '../store/formStore'
import FormDetails from '../components/CreateForm/FormDetails'
import FormDocsReq from '../components/CreateForm/FormDocsReq'
import CreateFormStatus from '../components/CreateFormStatus'
import CustomButton from '../components/CustomButton'
import AxiosInstance from '../services/AxiosInstance'

import styles from '../styles/Pages/CreateForm.module.css'

const ACCESS_TOKEN = process.env.BACKEND_API_TOKEN
const OWNER_ID = 2

const CreateForm = () => {
	const [step, setStep] = React.useState(1)

	const handleStep = () => {
		switch (step) {
			case 1:
				return <FormDetails />
			case 2:
				return <FormDocsReq />
			default:
				return null
		}
	}

	const submitHandler = async () => {
		try {
			const {
				title,
				academicYear,
				deadline,
				description,
				selectedCheckboxOptions,
				customDocs,
				setFormId,
			} = useFormStore.getState()

			const res = await AxiosInstance.post(
				'/adminpanel/form/',
				{
					title,
					deadline,
					description,
					academic_year: academicYear,
					owner: OWNER_ID,
				},
				{
					headers: {
						Authorization: `Bearer ${ACCESS_TOKEN}`,
					},
				}
			)

			const formId = res.data.id
			setFormId(formId)
			console.log(formId)

			console.log(selectedCheckboxOptions)
			await Promise.all(
				selectedCheckboxOptions.map(
					async (selectedCheckboxOption: any) =>
						await AxiosInstance.post(
							'/adminpanel/questions/pre-verified/',
							{
								form: formId,
								title: selectedCheckboxOption,
								technique: 'pre_verified',
							},
							{
								headers: {
									Authorization: `Bearer ${ACCESS_TOKEN}`,
								},
							}
						)
				)
			)

			console.log(customDocs)
			await Promise.all(
				customDocs.map(async (customDoc: any) => {
					if (!customDoc.isDeleted && customDoc.title) {
						return await AxiosInstance.post(
							'/adminpanel/questions/file/',
							{
								form: formId,
								title: customDoc.title,
								technique: 'file_upload',
							},
							{
								headers: {
									Authorization: `Bearer ${ACCESS_TOKEN}`,
								},
							}
						)
					}
				})
			)

			alert('Form has been created successfully.')
		} catch (err) {
			alert('An error occured, please try again.')
		}
	}

	return (
		<div
			className={styles.form__components}
			style={{
				height: '80vh',
				overflowY: 'scroll',
			}}
		>
			<p className={styles.create__form__title}>Create New Form</p>
			<div className={styles.create__form__status__wrap}>
				<CreateFormStatus currentStep={step} />
			</div>
			{handleStep()}
			<div className={styles.button__wrapper}>
				<div className={styles.button__internal__wrapper}>
					{step === 2 ? (
						<CustomButton
							handleClick={() => setStep(step - 1)}
							title={'Back'}
						/>
					) : null}
				</div>
				<div className={styles.button__internal__wrapper}>
					{step === 1 ? (
						<CustomButton
							handleClick={() => setStep((prevStep) => prevStep + 1)}
							title={'Next'}
						/>
					) : (
						<CustomButton handleClick={submitHandler} title={'Submit'} />
					)}
				</div>
			</div>
		</div>
	)
}
export default CreateForm
