export const Score = ({score}: {score: number}) => {

    return (
        <div className="absolute z-10 left-0 top-0">
            <div className="m-2 grid bg-darkest p-3 rounded-2xl">
                <div className="text-2xl">Score</div>
                <div className="text-dark">{score}</div>
            </div>
        </div>
    )
}