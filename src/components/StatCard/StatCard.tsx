import { Statistic, Skeleton } from 'antd'
import { useAppSelector } from '../../store/hooks'
import classes from './StatCard.module.scss'

const StatCard = ({
    title,
    confirmed,
    styles
}: {
    title: string
    confirmed: number
    styles: object
}) => {
    const { loading } = useAppSelector((state) => state.board)
    return (
        <>
            {!loading && (
                <Statistic
                    style={styles}
                    className={classes.StatCard}
                    title={title}
                    value={confirmed}
                />
            )}
            <Skeleton loading={loading} active />
        </>
    )
}

export default StatCard
