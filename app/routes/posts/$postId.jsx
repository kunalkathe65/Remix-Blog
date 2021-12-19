import {useLoaderData, Link, redirect} from 'remix'
import { db } from '~/utils/db.server'

export const loader = async({params}) => {
  const post = await db.post.findUnique({
    where : {id:params.postId}
  })
  if(!post) throw new Error('Post not found')
  const data = {post}
  return data
}

export const action = async({request,params}) => {
  const form = await request.formData()
  if(form.get('_method') === 'DELETE'){
    const post = await db.post.findUnique({
      where:{id:params.postId}
    })
    if(!post) throw new Error('Post not found')

    await db.post.delete({
      where:{id:post.id}
    })
    return redirect('/posts')
  }
}

function Post() {
    const {post} = useLoaderData()
    return (
      <>
        <div className='page-header'>
          <h1>{post.title}</h1>
          <Link to = '/posts' className='btn btn-reverse'>Back</Link>  
        </div>
        <div className="page-content">
          <form method='POST'>
            <input type='hidden' name='_method' value='DELETE' />
            <button className='btn btn-delete' type='submit'>Delete</button>
          </form>
        </div>
      </>
    )
}

export default Post
