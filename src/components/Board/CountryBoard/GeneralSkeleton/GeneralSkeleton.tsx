import { Skeleton, Space } from 'antd'

const GeneralSkeleton = () => {
    return (
        <Space direction='vertical'>
            <Space>
                <Skeleton.Button
                    active
                    shape='square'
                    style={{ width: 30, height: 30 }}
                    size='small'
                />
                <Skeleton.Button
                    shape='square'
                    style={{ width: 100, height: 30 }}
                    active
                    size='small'
                />
            </Space>

            <Space direction='vertical' size='small' style={{ rowGap: 0 }}>
                <Skeleton.Button
                    shape='square'
                    style={{ width: 140, height: '15.7px' }}
                    active
                    size='small'
                />
                <Skeleton.Button
                    shape='square'
                    style={{ width: 150, height: 20 }}
                    active
                    size='small'
                />
            </Space>
        </Space>
    )
}

export default GeneralSkeleton
