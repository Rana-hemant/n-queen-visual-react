pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'hemantrana/react-chessboard:latest'
        REGISTRY = 'docker.io'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Rana-hemant/n-queen-visual-react.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    // Use withCredentials to inject Docker credentials into environment variables
                    withCredentials([usernamePassword(credentialsId: 'chessboard-token', 
                                                      usernameVariable: 'DOCKER_USERNAME', 
                                                      passwordVariable: 'DOCKER_TOKEN')]) {
                        // Login to Docker Hub using the injected environment variables
                        sh 'echo $DOCKER_TOKEN | docker login -u $DOCKER_USERNAME --password-stdin'

                        // Push the Docker image to DockerHub
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy to Kubernetes (Minikube)
                    sh '''
                        kubectl set image deployment/react-chessboard react-chessboard=$DOCKER_IMAGE
                        kubectl rollout restart deployment/react-chessboard
                    '''
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
