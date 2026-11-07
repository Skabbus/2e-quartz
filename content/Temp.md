
PROMPT: 
Design a Python application that: 
- Watches a directory for incoming CSV files 
- Validates the contents 
- Stores records in SQLite 
- Exposes a REST API 
- Handles failures and retries 
- Produces audit logs 
- Describe: 
1. Folder structure 
2. Main modules 
3. Error handling 
4. Testing strategy 
5. How you would deploy it

## 1. Folder Structure

```
csv_processor/
├── main.py                 # Entry point
├── config/
│   └── settings.py       # Configuration
├── core/
│   ├── __init__.py
│   ├── file_watcher.py   # Directory monitoring
│   ├── validator.py      # CSV validation
│   ├── storage.py        # SQLite operations
│   └── audit_logger.py   # Audit logging
├── api/
│   ├── __init__.py
│   └── routes.py         # REST API endpoints
├── tests/
│   ├── __init__.py
│   ├── test_file_watcher.py
│   ├── test_validator.py
│   ├── test_storage.py
│   └── test_api.py
├── migrations/           # Database migrations
│   └── __init__.py
└── requirements.txt      # Dependencies
```

```
csv_processor/
├── main.py                 # Entry point
├── config/
│   └── settings.py       # Configuration
├── core/
│   ├── __init__.py
│   ├── file_watcher.py   # Directory monitoring
│   ├── validator.py      # CSV validation
│   ├── storage.py        # SQLite operations
│   └── audit_logger.py   # Audit logging
├── api/
│   ├── __init__.py
│   └── routes.py         # REST API endpoints
├── tests/
│   ├── __init__.py
│   ├── test_file_watcher.py
│   ├── test_validator.py
│   ├── test_storage.py
│   └── test_api.py
├── migrations/           # Database migrations
│   └── __init__.py
└── requirements.txt      # Dependencies
```

## 2. Main Modules

### File Watcher (core/file_watcher.py)

python

```
import os
import time
from pathlib import Path
import logging

class FileWatcher:
    def __init__(self, directory_path):
        self.directory = Path(directory_path)
        self.logger = logging.getLogger(__name__)
    
    def watch_directory(self):
        """Monitor directory for new CSV files"""
        # Implementation using watchdog or os.listdir
        pass
```

```
import os
import time
from pathlib import Path
import logging

class FileWatcher:
    def __init__(self, directory_path):
        self.directory = Path(directory_path)
        self.logger = logging.getLogger(__name__)
    
    def watch_directory(self):
        """Monitor directory for new CSV files"""
        # Implementation using watchdog or os.listdir
        pass
```

### Validator (core/validator.py)

python

```
import csv
import pandas as pd
from typing import List, Dict

class CSVValidator:
    def __init__(self, schema: Dict):
        self.schema = schema
    
    def validate(self, file_path: str) -> bool:
        """Validate CSV content against schema"""
        try:
            with open(file_path, 'r') as f:
                reader = csv.DictReader(f)
                # Validate structure and data types
                return True
        except Exception as e:
            self.logger.error(f"Validation failed: {e}")
            return False
```

```
import csv
import pandas as pd
from typing import List, Dict

class CSVValidator:
    def __init__(self, schema: Dict):
        self.schema = schema
    
    def validate(self, file_path: str) -> bool:
        """Validate CSV content against schema"""
        try:
            with open(file_path, 'r') as f:
                reader = csv.DictReader(f)
                # Validate structure and data types
                return True
        except Exception as e:
            self.logger.error(f"Validation failed: {e}")
            return False
```

### Storage (core/storage.py)

python

```
import sqlite3
from typing import List, Dict

class SQLiteStorage:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._init_db()
    
    def _init_db(self):
        """Initialize database and create tables"""
        # Create tables for records and audit logs
    
    def store_records(self, records: List[Dict]) -> bool:
        """Store validated records in SQLite"""
        # Implementation with transactions
        pass
```

```
import sqlite3
from typing import List, Dict

class SQLiteStorage:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._init_db()
    
    def _init_db(self):
        """Initialize database and create tables"""
        # Create tables for records and audit logs
    
    def store_records(self, records: List[Dict]) -> bool:
        """Store validated records in SQLite"""
        # Implementation with transactions
        pass
```

### Audit Logger (core/audit_logger.py)

python

```
import logging
from datetime import datetime

class AuditLogger:
    def __init__(self, log_file: str):
        self.logger = logging.getLogger('audit')
        self.logger.setLevel(logging.INFO)
        # Add file handler
    
    def log_success(self, message: str):
        """Log successful operations"""
        self.logger.info(f"SUCCESS: {message}")
    
    def log_failure(self, message: str):
        """Log failures"""
        self.logger.error(f"FAILURE: {message}")
```

```
import logging
from datetime import datetime

class AuditLogger:
    def __init__(self, log_file: str):
        self.logger = logging.getLogger('audit')
        self.logger.setLevel(logging.INFO)
        # Add file handler
    
    def log_success(self, message: str):
        """Log successful operations"""
        self.logger.info(f"SUCCESS: {message}")
    
    def log_failure(self, message: str):
        """Log failures"""
        self.logger.error(f"FAILURE: {message}")
```

## 3. Error Handling

### Retry Mechanism (core/retry.py)

python

```
import time
from functools import wraps

def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    time.sleep(delay)
            return None
        return wrapper
    return decorator
```

```
import time
from functools import wraps

def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    time.sleep(delay)
            return None
        return wrapper
    return decorator
```

### Comprehensive Error Handling

python

```
class ErrorHandler:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def handle_file_error(self, file_path: str, error: Exception):
        """Handle file processing errors"""
        self.logger.error(f"Failed to process {file_path}: {error}")
        # Log to audit trail
        # Retry mechanism
    
    def handle_storage_error(self, record: Dict, error: Exception):
        """Handle storage errors"""
        self.logger.error(f"Failed to store record: {error}")
        # Retry logic or queue for later processing
```

```
class ErrorHandler:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def handle_file_error(self, file_path: str, error: Exception):
        """Handle file processing errors"""
        self.logger.error(f"Failed to process {file_path}: {error}")
        # Log to audit trail
        # Retry mechanism
    
    def handle_storage_error(self, record: Dict, error: Exception):
        """Handle storage errors"""
        self.logger.error(f"Failed to store record: {error}")
        # Retry logic or queue for later processing
```

## 4. Testing Strategy

### Unit Tests (tests/)

python

```
import unittest
from unittest.mock import patch, MagicMock

class TestFileWatcher(unittest.TestCase):
    def test_file_detection(self):
        # Mock file system
    
    def test_file_processing(self):
        # Test with actual CSV files
    
class TestValidator(unittest.TestCase):
    def test_valid_csv(self):
        # Test valid CSV structure
    
    def test_invalid_csv(self):
        # Test invalid CSV handling

class TestStorage(unittest.TestCase):
    def test_record_storage(self):
        # Test database operations
    
    def test_audit_logging(self):
        # Test audit logging functionality
```

```
import unittest
from unittest.mock import patch, MagicMock

class TestFileWatcher(unittest.TestCase):
    def test_file_detection(self):
        # Mock file system
    
    def test_file_processing(self):
        # Test with actual CSV files
    
class TestValidator(unittest.TestCase):
    def test_valid_csv(self):
        # Test valid CSV structure
    
    def test_invalid_csv(self):
        # Test invalid CSV handling

class TestStorage(unittest.TestCase):
    def test_record_storage(self):
        # Test database operations
    
    def test_audit_logging(self):
        # Test audit logging functionality
```

### Integration Tests

python

```
def test_end_to_end():
    """Test complete workflow from file detection to API exposure"""
    # Setup test environment
    # Process CSV file
    # Validate data
    # Store in DB
    # Expose via REST API
    # Assert correct behavior
```

```
def test_end_to_end():
    """Test complete workflow from file detection to API exposure"""
    # Setup test environment
    # Process CSV file
    # Validate data
    # Store in DB
    # Expose via REST API
    # Assert correct behavior
```

### Mock Testing Approach

python

```
# Test with mocked filesystem and database
@patch('os.listdir')
def test_directory_monitoring(self, mock_listdir):
    # Mock directory listing
    pass
```

```
# Test with mocked filesystem and database
@patch('os.listdir')
def test_directory_monitoring(self, mock_listdir):
    # Mock directory listing
    pass
```

## 5. Deployment Strategy

### Docker Deployment (Dockerfile)

dockerfile

```
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

```
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

### Production Deployment (deployment/)

yaml

```
# docker-compose.yml
version: '3.8'
services:
  csv-processor:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - ./data:/app/data
    environment:
      - ENV=production
      - DATABASE_URL=sqlite:///app/data/db.sqlite
```

```
# docker-compose.yml
version: '3.8'
services:
  csv-processor:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - ./data:/app/data
    environment:
      - ENV=production
      - DATABASE_URL=sqlite:///app/data/db.sqlite
```

### Environment Configuration

python

```
# config/settings.py
class Config:
    DATABASE_PATH = "/app/data/db.sqlite"
    WATCH_DIRECTORY = "/app/data/incoming"
    API_PORT = 5000
    RETRY_ATTEMPTS = 3
    LOG_LEVEL = "INFO"
```

```
# config/settings.py
class Config:
    DATABASE_PATH = "/app/data/db.sqlite"
    WATCH_DIRECTORY = "/app/data/incoming"
    API_PORT = 5000
    RETRY_ATTEMPTS = 3
    LOG_LEVEL = "INFO"
```

### Monitoring and Logging

python

```
# Production logging setup
import logging
from logging.handlers import RotatingFileHandler

logging.basicConfig(
    level=logging.INFO,
    handlers=[
        RotatingFileHandler("app.log", maxBytes=1024*1024*5, backupCount=5),
        logging.StreamHandler()
    ]
)
```

```
# Production logging setup
import logging
from logging.handlers import RotatingFileHandler

logging.basicConfig(
    level=logging.INFO,
    handlers=[
        RotatingFileHandler("app.log", maxBytes=1024*1024*5, backupCount=5),
        logging.StreamHandler()
    ]
)
```

### API Deployment (FastAPI + Gunicorn)

python

```
# api/routes.py
from fastapi import FastAPI

app = FastAPI()
@app.get("/records")
def get_records():
    # Return records from database
    pass
```

```
# api/routes.py
from fastapi import FastAPI

app = FastAPI()
@app.get("/records")
def get_records():
    # Return records from database
    pass
```

This architecture provides a robust, scalable solution that can be easily tested, deployed, and maintained in production environments.