import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, addDoc, collection, collectionData, docData, deleteDoc } from '@angular/fire/firestore';
import { BlogPostHelper } from '../../../core/helpers/blogpost-helper';
import { BlogPost } from '../models/blogpost.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  firestore = inject(Firestore);

  createBlogPost(title: string, content: string, coverImageUrl: string) {
    // addDoc
    // const postsCollectionReference = collection(this.firestore, 'blog-posts');

    // addDoc(postsCollectionReference, {
      // title: title,
      // content: content,
    //   publishedOn: new Date(),
    //   // coverImageUrl
    // })

    // setDoc

    const blogPostDocumentRef = doc(this.firestore, 'blog-posts',
      BlogPostHelper.createSlug(title));
    setDoc(blogPostDocumentRef, {
      title: title,
      content: content,
      publishedOn: new Date(),
      coverImageUrl: coverImageUrl
      // coverImageUrl
      // })
    });
  }

  updateBlogPost(slug: string, title: string, content: string, coverImageUrl: string) {
    // addDoc
    // const postsCollectionReference = collection(this.firestore, 'blog-posts');

    // addDoc(postsCollectionReference, {
      // title: title,
      // content: content,
    //   publishedOn: new Date(),
    //   // coverImageUrl
    // })

    // setDoc

    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);
    setDoc(blogPostDocumentRef, {
      title: title,
      content: content,
      publishedOn: new Date(),
      coverImageUrl: coverImageUrl
    });
  }

  getBlogPosts(): Observable<BlogPost[]> {
    const blogPostCollectionRef = collection(this.firestore, 'blog-posts');

    return collectionData(blogPostCollectionRef, {
      idField: 'slug'
    }) as Observable<BlogPost[]>;
  }

  getBlogPostBySlug(slug: string): Observable<BlogPost> {
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);

    return docData(blogPostDocumentRef, {
      idField: 'slug'
    }) as Observable<BlogPost>;
  }

  deleteBlogPostBySlug(slug: string): Observable<void> {
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);
    const promise = deleteDoc(blogPostDocumentRef);
    return from(promise)
  }

}
