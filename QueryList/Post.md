## Post get by slug 

{
  posts(filters: {slug: {eq: "10-ways-to-reduce-your-stress-this-year"}, status: {eq: true}}) {
    data {
      id
      attributes {
        createdBy {
          id
          firstname
          lastname
        }
        title_en
        title_bn
        breadcrumb_en
        breadcrumb_bn
        content_first_en
        content_first_bn
        content_sec_en
        content_sec_bn
        rating
        category {
        	data {
            attributes {
              title_en
              title_bn
              slug
            }
          }
        }
        tags {
          data {
            attributes {
              title_en
              title_bn
            }
          }
        }
        createdAt
        PublishedDate
        updatedAt
        description
        keywords
        image {
          data {
            attributes {
              url
              width
              height
            }
          }
        }
      }
    }
  }
}