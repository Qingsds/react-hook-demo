import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'
import NiceModal, {
    createNiceModal,
    useNiceModal,
    USER_INFO_MODAL,
} from './nice-model'
import { User } from './user-list'

export default createNiceModal(USER_INFO_MODAL, ({ user }: { user: User }) => {
    const [form] = Form.useForm()
    const mate = {
        initialValues: user,
        fields: [
            { key: 'name', label: 'Name', require: true },
            { key: 'job', label: 'Job Title', require: true },
        ],
    }
    const modal = useNiceModal(USER_INFO_MODAL)

    const handleSubmit = () => {
        form.validateFields().then(() => {
            modal.resolve({ ...user, ...form.getFieldsValue() })
            modal.hide()
        })
    }

    return (
        <NiceModal
            id={USER_INFO_MODAL}
            title={user ? 'Edit User' : 'New User'}
            okText={user ? 'Update' : 'Create'}
            onOk={handleSubmit}
        >
            <Form form={form}>
                <FormBuilder meta={mate} form={form} />
            </Form>
        </NiceModal>
    )
})
