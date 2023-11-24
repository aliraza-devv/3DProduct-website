import { Children } from 'react'
import { motion } from 'framer-motion'
import Logo from '../src/assets/Ali-Raza-Logo.png'
import { useStore } from './store'

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0 }
}

function List({ children, open }) {
  return (
    <motion.ul variants={container} initial="hidden" animate={open ? 'show' : 'hidden'}>
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  )
}

export function Overlay() {
  const state = useStore()
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <a href="https://www.alirazaa.dev/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}>
          Ali Raza
          <br />
          Developer
        </a>
        {/* <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>24/11/2023</div> */}
      </div>
      <img src={Logo} alt='Ali Raza Logo' height={30} width={30}/>
      <div className="info">
        <h1>new arm chair</h1>
        <List open={state.open}>
          <h3>Office </h3>
          <h3>“Chair”</h3>
          <h3>
            <span className="accent">Brand</span>
          </h3>
          <h4>Arm Chair</h4>
          <p className="price">$110.20</p>
          <p>
            You can rotate or zoom to see every inch of the product. 
            Experience the new world, and look at every bit of your product in 3D.
          </p>
        </List>
      </div>
    </>
  )
}
