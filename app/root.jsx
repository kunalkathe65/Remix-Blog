import { Outlet, LiveReload, Link, Links, Meta } from 'remix'
import globalStyleSheet from '~/styles/global.css'

export const links = () => [{rel:'stylesheet',href:globalStyleSheet}]
export const meta = () => {
  const description = 'A blog app made with Remix framework'
  const keywords  = 'Remix,Blog,React,App'

  return {
    description,
    keywords
  }
}

export default function App(){
  return (
    <Document title='Remix Blog App'>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({children, title}){
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <title>{title ? title : 'Blog'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV == 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

function Layout({children}){
  return(
    <>
      <nav className='navbar'>
        <Link to='/' className='logo'>Remix</Link>
        <Link to='/posts'>Posts</Link>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}

//Root Error Boundary
export function ErrorBoundary ({error}){
  console.log(error)
  return (
    <Document title='Error'>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  )
}