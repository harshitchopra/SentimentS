#include<bits/stdc++.h>
using namespace std;

int main{
	string s;
	cin>>s;
	int ans;
	for(int i=0;i<s.length();i++){
		if(s[i]-'0'>=48 && s[i]-'0'<=57){
			 int f=s[i]-'0';
			int second=s[i+1]-'0';
			int num=f*10+second;
			ans+=num;
		}
	}
	cout<<ans;
    return 0;
}
