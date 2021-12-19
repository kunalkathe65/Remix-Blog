import {Link, redirect} from 'remix'
import {db} from '~/utils/db.server'

export const action = async({request}) =>{
    const form = await request.formData()
    const title = form.get('title')
    const body = form.get('body')
    const fields = {title,body}
    // Add to DB
    const createdPost = await db.post.create({data:fields})
    return redirect(`/posts/${createdPost.id}`)
}

function newPost() {
    return (
        <>
            <div className='page-header'>
                <h3>Create New Post</h3>
                <Link to = '/posts' className='btn btn-reverse'>Back</Link>
            </div>
            <div className='page-content'>
                <form method='POST'>
                    <div className='form-control'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' id='title' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='body'>Post Body</label>
                        <textarea name='body' id='body' />
                    </div>
                    <button type='submit' className=" btn btn-block">Add Post</button>
                </form>
            </div>
        </>
    )
}

export default newPost
