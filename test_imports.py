#!/usr/bin/env python3
"""
Simple test script to verify critical imports work
"""
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

def test_imports():
    """Test that critical modules can be imported"""
    try:
        print("Testing backend.database...")
        from backend.database import get_db, Base
        print("✓ database module imported successfully")
        
        print("Testing backend.models...")
        from backend.models import User, Employee, Shift, Client, Site
        print("✓ models module imported successfully")
        
        print("Testing backend.schemas...")
        from backend.schemas import UserInfo, Employee, Shift
        print("✓ schemas module imported successfully")
        
        print("Testing backend.auth...")
        from backend.auth import create_access_token, authenticate_user
        print("✓ auth module imported successfully")
        
        print("Testing backend.services.shift_assignment...")
        from backend.services.shift_assignment import ShiftAssignmentAlgorithm
        print("✓ shift_assignment service imported successfully")
        
        print("\n✅ All critical imports successful!")
        return True
        
    except Exception as e:
        print(f"\n❌ Import failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    test_imports()