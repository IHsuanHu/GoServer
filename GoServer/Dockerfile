# Use the official Golang image to create a build artifact.
# https://hub.docker.com/_/golang
FROM golang:1.22.2 AS builder

# Create and change to the app directory.
WORKDIR /app

# Copy local code to the container image.
COPY . .

# Retrieve application dependencies using go mod.
RUN go mod download

# Build the binary.
# Make sure to build from the correct directory and output to the intended location.
RUN mkdir -p bin
RUN go build -o bin/goserver ./cmd/urlshortener

# Use a Docker multi-stage build to create a lean production image.
FROM golang:1.22.2

WORKDIR /app

# Copy the binary to the production image from the builder stage.
COPY --from=builder /app/bin /app/bin

# Run the web service on container startup.
ENTRYPOINT ["/app/bin/goserver"]
