import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function PostSkeleton() {
  return (
    <Card sx={{ elevation: "0", maxWidth: "100%", borderRadius: "10px", marginBottom: "25px" }}>
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={32}
            width="75%"
            style={{ marginBottom: -10, marginTop: 20 }}
          />
        }
      />

      <CardContent>
        <>
          <Skeleton
            animation="wave"
            height={18}
            width="95%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={18}
            width="95%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={18}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        </>
      </CardContent>
    </Card>
  );
}

export default PostSkeleton;