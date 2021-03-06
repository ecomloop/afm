// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';
import Helmet from 'react-helmet';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const IndexTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle, url: homepage } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;


  const { edges } = data.allMarkdownRemark;
  const featuredEdges = data.featuredposts.edges;
  const pageTitle = currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle + ' | ' + siteSubtitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>


      {currentPage>0 &&
        <Helmet>
            <link rel="canonical" href={homepage} />
            <meta name="robots" content="noindex" />
        </Helmet>
      }

      <Sidebar isIndex />
      <Page>
<h2>{siteTitle}</h2>

  <a href="/?new"><img src={'https://source.unsplash.com/800x300/?abstract.'+ Math.random()} alt={pageTitle} width={"800"} height={"300"}/></a>

  <p>{siteSubtitle} <br/>🌊🎿📚🚲⚾🏔️🎾📝</p>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
            featuredImage
          }
        }
      }
    }

    featuredposts: allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { template: { eq: "post" }, category: {eq: "Featured"}, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title

            date
            category
            description
            featuredImage
          }
        }
      }
    }

  }
`;

export default IndexTemplate;
