import { Skeleton, Space } from 'antd'

const CovidListSkeleton = () => {
    return (
        <Space>
            <Skeleton.Button
                active
                shape='round'
                style={{ width: 30, height: 30 }}
                size='small'
            />
            <Space
                direction='vertical'
                size='small'
                style={{ rowGap: 0, lineHeight: '18px' }}
            >
                <Skeleton.Input
                    active
                    size='small'
                    style={{ width: 70, height: 10, verticalAlign: 'middle' }}
                />
                <Skeleton.Input
                    active
                    size='small'
                    style={{ width: 90, height: 12, verticalAlign: 'baseline' }}
                />
            </Space>
            {/* <Skeleton.Button
                active
                shape='square'
                style={{ width: 150, height: 30 }}
                size='small'
            /> */}
        </Space>
    )
}

export default CovidListSkeleton
