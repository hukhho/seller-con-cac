# Use the gatsbyjs/gatsby:onbuild image to build your Gatsby project
FROM gatsbyjs/gatsby:onbuild as build

# Use the gatsbyjs/gatsby image as the final image
FROM gatsbyjs/gatsby

# Copy the built Gatsby site from the build image
COPY --from=build /app/public /pub