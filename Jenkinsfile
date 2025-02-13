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
                    withCredentials([string(credentialsId: 'chessboard-token', variable: 'DOCKER_TOKEN')]) {
                        sh 'echo $DOCKER_TOKEN | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy to Kubernetes (Minikube or AWS EKS)
                    sh '''
                        kubectl set image deployment/frontend frontend=$DOCKER_IMAGE
                        kubectl rollout restart deployment/frontend
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
