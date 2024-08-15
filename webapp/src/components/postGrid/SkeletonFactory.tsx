import { Box, Grid, Skeleton } from "@mui/material";

const PostListSkeleton = () => {
  return (
    <>
      <Grid
        container
        rowSpacing={0}
        columnSpacing={1}
        sx={{ justifyContent: "center" }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export { PostListSkeleton };
