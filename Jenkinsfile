pipeline {
    agent any

    tools {
        nodejs 'Node.js'  // Make sure to have NodeJS installed in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'  // Install browsers and dependencies
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'  // If you have a build script in package.json
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Generate Report') {
            steps {
                sh 'npx playwright show-report'
                // Archive the test results
                archiveArtifacts artifacts: 'playwright-report/**'
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after build
        }
    }
}