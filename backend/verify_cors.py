import urllib.request
import urllib.error
import json

def test_endpoint():
    url = "http://127.0.0.1:8002/api/v1/query-video/"
    print(f"Testing Endpoint: {url}")
    
    # 1. Test OPTIONS (CORS Preflight)
    print("1. Testing OPTIONS request (CORS)...")
    req = urllib.request.Request(url, method='OPTIONS')
    req.add_header('Origin', 'http://localhost:3000')
    req.add_header('Access-Control-Request-Method', 'POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"   Status Code: {response.status}")
            acao = response.getheader('Access-Control-Allow-Origin')
            print(f"   ACAO Header: {acao}")
            
            if acao == '*':
                print("   ✅ CORS Preflight Passed")
            else:
                print("   ⚠️ CORS Header missing or incorrect")
    except urllib.error.URLError as e:
        print(f"   ❌ Connection Failed: {e}")

    # 2. Test POST (Actual Request)
    print("\n2. Testing POST request (Backend Logic)...")
    # Sending empty body to provoke validation error (400)
    data = json.dumps({}).encode('utf-8')
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('Origin', 'http://localhost:3000')

    try:
        with urllib.request.urlopen(req) as response:
            print(f"   Status Code: {response.status}")
    except urllib.error.HTTPError as e:
        print(f"   Status Code: {e.code}")
        if e.code < 500:
             print("   ✅ Backend is reachable and responding (Client Error is expected for empty data)")
        else:
             print(f"   ❌ Backend Error: {e.code}")
    except urllib.error.URLError as e:
        print(f"   ❌ Connection Failed: {e}")

if __name__ == "__main__":
    test_endpoint()
