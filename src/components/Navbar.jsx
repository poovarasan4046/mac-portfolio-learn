import dayjs from "dayjs"

import { navIcons, navLinks } from "#constants"

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="Logo" />
            <p className="font-bold">Mac Portfolio</p>

            <ul>
                {
                    navLinks.map(({name, id}) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>

        <div>
            <ul>
                {
                    navIcons.map(({id, img}) => (
                        <li key={id}>
                            <img src={img} alt={`icon-${id}`} />
                        </li>
                    ))
                }
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

export default Navbar