import clsx from "clsx"

const Player:React.FC<{ name: string, time: string, key: number, index: number}> = ({name, time, index}) => {
  return (
    <tr>
      <td className={clsx("p-4 border-2 border-solid border-black-500 w-full h-8 bg-white max-sm:text-base text-xl flex justify-between items-center text-purple-700", {
        "border-b-0": index !== 9,
        "text-red-700": name == 'Вы'
      })}>
        <span className="font-bold">{name}</span>
        <span className="w-16 text-center text-red-500 font-bold">{Math.floor(+time / 600)}{Math.floor((+time % 600) / 60)}:{Math.floor((+time % 60) / 10)}{Math.floor(+time % 10)}</span>
      </td>
    </tr>
  )
}

export default Player